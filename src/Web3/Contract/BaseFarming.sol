// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract BaseFarming is Initializable, AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount;     // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 lpToken;           // Address of LP token contract.
        uint256 allocPoint;       // How many allocation points assigned to this pool. 
        uint256 lastRewardTimestamp;  // Last block timestamp that reward distribution occurs.
        uint256 accRewardPerShare;  // Accumulated reward token per share, times 1e12. See below.
    }

    // The Reward TOKEN
    IERC20 public rewardToken;  //0x9F2b8EAA0cb96bc709482eBdcB8f18dFB12D3133
    // Dev address.
    address public devaddr; //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

    // The timestamp when mining starts.
    uint256 public startTime; //1688995300
    // Timestamp when all reward ends.
    uint256 public allEndTime; //1688995531
    // tokens created per second.
    uint256 public rewardPerSecond; //20000000000000000000

    // Info of each pool.
    PoolInfo[] public poolInfo;
    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping (address => UserInfo)) public userInfo;
    // Total allocation poitns. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;

    // check if lp has been registered
    mapping(address => bool) public lpUsed;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);

    function initialize(
        IERC20 _rewardToken,
        address _devaddr,
        uint256 _rewardPerSecond,
        uint256 _startTime,
        uint256 _allEndTime
    ) public virtual initializer {
        rewardToken = _rewardToken;
        devaddr = _devaddr;
        rewardPerSecond = _rewardPerSecond;
        startTime = _startTime;
        allEndTime = _allEndTime;

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function poolLength() public virtual view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the admin.
    // XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do.
    function add(uint256 _allocPoint, IERC20 _lpToken, bool _withUpdate) public virtual {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "add: not admin");
        require(!lpUsed[address(_lpToken)], "add: lp is already registered");
        lpUsed[address(_lpToken)] = true;

        if (_withUpdate) {
            massUpdatePools();
        }

        uint256 lastRewardTimestamp = block.timestamp > startTime ? block.timestamp : startTime;
        totalAllocPoint = totalAllocPoint + _allocPoint;
        poolInfo.push(PoolInfo({
            lpToken: _lpToken,
            allocPoint: _allocPoint,
            lastRewardTimestamp: lastRewardTimestamp,
            accRewardPerShare: 0
        }));
    }

    // Update the given pool's reward allocation point. Can only be called by the owner.
    function set(uint256 _pid, uint256 _allocPoint, bool _withUpdate) public virtual {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "set: not admin");
        require(_pid < poolInfo.length, "set: invalid pid");
        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint = totalAllocPoint - poolInfo[_pid].allocPoint + _allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    // Return reward multiplier over the given _from to _to timestamp.
    function getMultiplier(uint256 _from, uint256 _to) public virtual view returns (uint256) {
        if (_to <= startTime) {
            return 0;
        }
        if (_from >= allEndTime) {
            return 0;
        }
        if (_from < startTime) {
            _from = startTime;
        }
        if (_to > allEndTime) {
            _to = allEndTime;
        }
        return _to - _from;
    }

    function pendingReward(uint256 _pid, address _user) public virtual view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accRewardPerShare = pool.accRewardPerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (block.timestamp > pool.lastRewardTimestamp && lpSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardTimestamp, block.timestamp);
            uint256 _reward = multiplier * rewardPerSecond * pool.allocPoint / totalAllocPoint;
            accRewardPerShare = accRewardPerShare + (_reward * 1e12 / lpSupply);
        }
        return user.amount * accRewardPerShare / 1e12 - user.rewardDebt;
    }

    // Update reward vairables for all pools. Be careful of gas spending!
    function massUpdatePools() public virtual {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public virtual {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.timestamp <= pool.lastRewardTimestamp) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardTimestamp = block.timestamp;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardTimestamp, block.timestamp);
        uint256 _reward = multiplier * rewardPerSecond * pool.allocPoint / totalAllocPoint;
        _mintToDev(_reward);
        _mintToFarm(_reward);
        pool.accRewardPerShare = pool.accRewardPerShare + (_reward * 1e12 / lpSupply);
        pool.lastRewardTimestamp = block.timestamp;
    }

    function _mintToDev(uint256 /*_totalAmount*/) internal virtual {}

    function _mintToFarm(uint256 /*_totalAmount*/) internal virtual {}

    function deposit(uint256 _pid, uint256 _amount) public virtual nonReentrant {
        require(_pid < poolInfo.length, "deposit: invalid pid");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending = user.amount * pool.accRewardPerShare / 1e12 - user.rewardDebt;
            safeRewardTransfer(msg.sender, pending);
        }
        if(_amount > 0) {
            pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            user.amount = user.amount + _amount;
        }
        user.rewardDebt = user.amount * pool.accRewardPerShare / 1e12;
        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens.
    function withdraw(uint256 _pid, uint256 _amount) public virtual nonReentrant {
        require(_pid < poolInfo.length, "withdraw: invalid pid");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        uint256 pending = user.amount * pool.accRewardPerShare / 1e12 - user.rewardDebt;
        user.amount = user.amount - _amount;
        user.rewardDebt = user.amount * pool.accRewardPerShare / 1e12;
        safeRewardTransfer(msg.sender, pending);
        pool.lpToken.safeTransfer(address(msg.sender), _amount);
        emit Withdraw(msg.sender, _pid, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) external virtual nonReentrant {
        require(_pid < poolInfo.length, "emergencyWithdraw: invalid pid");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        uint256 amount = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;
        pool.lpToken.safeTransfer(address(msg.sender), amount);
        emit EmergencyWithdraw(msg.sender, _pid, amount);
    }

    // Safe rewardToken transfer function, just in case if rounding error causes pool to not have enough reward token.
    function safeRewardTransfer(address _to, uint256 _amount) internal virtual {
        uint256 _balance = rewardToken.balanceOf(address(this));
        if (_amount > _balance) {
            rewardToken.transfer(_to, _balance);
        } else {
            rewardToken.transfer(_to, _amount);
        }
    }

    // Update dev address by the previous dev.
    function dev(address _devaddr) public virtual {
        require(msg.sender == devaddr, "Should be dev address");
        devaddr = _devaddr;
    }
}
