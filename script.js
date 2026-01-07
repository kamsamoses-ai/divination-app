document.addEventListener('DOMContentLoaded', () => {
    const userInfoScreen = document.getElementById('user-info-screen');
    const divinationScreen = document.getElementById('divination-screen');
    const enterDivinationButton = document.getElementById('enter-divination-button');
    const divineButton = document.getElementById('divine-button');
    const hexagramDisplay = document.getElementById('hexagram-display');
    const resultDisplay = document.getElementById('result-display');
    const questionInput = document.getElementById('question');
    const nameInput = document.getElementById('name');
    const birthYearInput = document.getElementById('birth-year');
    const birthMonthInput = document.getElementById('birth-month');
    const birthDayInput = document.getElementById('birth-day');
    const historyList = document.getElementById('history-list');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const animationGif = document.getElementById('animation-gif');
    const clickSound = document.getElementById('click-sound');
    const resultSound = document.getElementById('result-sound');

    const YIN = '⚋';
    const YANG = '⚊';
    const CHANGING_YIN = '⚏';
    const CHANGING_YANG = '⚍';

    const hexagramTones = {
        '乾': '大吉', '坤': '顺遂', '屯': '挑战', '蒙': '迷茫', '需': '等待', '讼': '警示', '师': '挑战', '比': '顺遂',
        '小畜': '等待', '履': '警示', '泰': '大吉', '否': '挑战', '同人': '顺遂', '大有': '大吉', '谦': '大吉', '豫': '顺遂',
        '随': '顺遂', '蛊': '挑战', '临': '顺遂', '观': '等待', '噬嗑': '挑战', '贲': '顺遂', '剥': '警示', '复': '转机',
        '无妄': '警示', '大畜': '顺遂', '颐': '警示', '大过': '挑战', '坎': '挑战', '离': '顺遂', '咸': '顺遂', '恒': '顺遂',
        '遁': '警示', '大壮': '警示', '晋': '大吉', '明夷': '挑战', '家人': '顺遂', '睽': '挑战', '蹇': '挑战', '解': '转机',
        '损': '警示', '益': '大吉', '夬': '警示', '姤': '警示', '萃': '顺遂', '升': '大吉', '困': '挑战', '井': '顺遂',
        '革': '转机', '鼎': '大吉', '震': '转机', '艮': '等待', '渐': '顺遂', '归妹': '警示', '丰': '大吉', '旅': '挑战',
        '巽': '顺遂', '兑': '大吉', '涣': '转机', '节': '警示', '中孚': '大吉', '小过': '警示', '既济': '警示', '未济': '挑战'
    };

    const hexagramMappings = {
        '乾': { core: '创造, 力量, 开端, 领导', career: '是开创事业、展现领导力的绝佳时机，应主动进取。', relationship: '关系中充满了主动与激情，适合开创新的阶段，但不宜过于强势。', health: '生命力旺盛，应加强锻炼以疏导能量，防止精力过剩。' },
        '坤': { core: '承载, 柔顺, 合作, 滋养', career: '应扮演支持与合作的角色，厚积薄发，不宜急于表现。', relationship: '需要更多的包容与耐心，通过顺应与付出，关系将得到滋养。', health: '注重调养与休息，顺应身体的自然节律，避免过度消耗。' },
        '屯': { core: '新生, 困难, 积蓄, 萌芽', career: '创业初期困难重重，需要耐心和毅力，关键在于打好基础。', relationship: '新生的感情充满考验，需要双方共同努力克服障碍。', health: '身体正处于恢复期或新生期，需要小心调养，不可冒进。' },
        '蒙': { core: '启蒙, 迷茫, 教育, 求知', career: '处于学习和探索阶段，需要虚心求教，避免自作聪明。', relationship: '关系中存在误解或迷茫，需要耐心沟通，共同成长。', health: '身体状况不明朗，应寻求专业诊断，不可盲目用药。' },
        '需': { core: '等待, 需求, 信心, 时机', career: '时机未到，需要耐心等待，积蓄力量，不可冒进。', relationship: '感情需要时间培养，急于求成反而会破坏关系。', health: '身体恢复需要时间，应安心静养，等待康复。' },
        '讼': { core: '争讼, 冲突, 矛盾, 谨慎', career: '容易发生商业纠纷或人事矛盾，应尽量避免冲突，寻求和解。', relationship: '关系中充满争吵与不和，需要冷静沟通，避免升级。', health: '体内阴阳失和，容易引发炎症或冲突性疾病。' },
        '师': { core: '军队, 纪律, 领导, 群众', career: '适合团队作战，需要严明的纪律和优秀的领导，才能取得成功。', relationship: '关系需要双方共同遵守规则，有明确的分工与责任。', health: '需要系统性的治疗方案，如同军队作战，讲究策略。' },
        '比': { core: '亲近, 辅佐, 团结, 择善', career: '利于团队合作与人际交往，选择好的伙伴至关重要。', relationship: '关系亲密无间，是互相扶持、共同进步的好时机。', health: '身心和谐，与周围环境相处融洽，利于健康。' },
        '小畜': { core: '积蓄, 酝酿, 停滞, 小成', career: '力量积蓄中，虽有小的进展但大的突破尚需时日。', relationship: '感情在酝酿阶段，虽有甜蜜但仍有阻碍。', health: '病情处于稳定期，但未能根除，需要持续调理。' },
        '履': { core: '履行, 礼仪, 实践, 谨慎', career: '按部就班，遵守规则是成功的关键，需小心应对风险。', relationship: '关系中需要遵守礼节和承诺，不可越界。', health: '生活作息需要规律，遵循养生之道。' },
        '泰': { core: '通达, 和谐, 顺利, 交流', career: '内外和谐，上下同心，是推动项目、拓展业务的大好时机。', relationship: '感情交流顺畅，关系和谐美满，适合深入发展。', health: '身心通泰，气血流畅，保持良好的生活习惯即可。' },
        '否': { core: '闭塞, 阻碍, 不通, 逆境', career: '天地不交，万事不顺，应退守自保，等待时机。', relationship: '沟通渠道堵塞，关系陷入僵局，需要反思。', health: '气血不通，身体机能下降，应加强疏导。' },
        '同人': { core: '和同, 团结, 公正, 无私', career: '利于与人合作，目标一致，事业可成。', relationship: '志同道合，关系和谐，适合共同规划未来。', health: '身心内外和谐，与他人交往有益健康。' },
        '大有': { core: '丰盛, 拥有, 光明, 成功', career: '如日中天，收获丰厚，应谦虚谨慎，分享成果。', relationship: '感情生活富足美满，应珍惜所有。', health: '精力充沛，身体状况极佳。' },
        '谦': { core: '谦逊, 卑下, 亨通, 内敛', career: '谦虚的态度会为你赢得尊重和机遇，大吉大利。', relationship: '在关系中保持谦逊和低姿态，会使感情更加稳固。', health: '心态平和，不骄不躁，是养生的最高境界。' },
        '豫': { core: '愉悦, 准备, 顺应, 享乐', career: '事情进展顺利，但需警惕沉迷享乐而荒废主业。', relationship: '关系轻松愉快，但需有长远规划，不能只顾眼前。', health: '心情愉悦，但需注意节制，防止乐极生悲。' },
        '随': { core: '追随, 顺从, 变通, 择善', career: '应顺应时势，追随有能力的领导，不可固执己见。', relationship: '关系中需要一方的顺从和追随，才能和谐。', health: '顺应身体的自然变化，不可强行干预。' },
        '蛊': { core: '弊病, 整顿, 救弊, 革新', career: '内部存在问题，需要大刀阔斧地改革和整顿。', relationship: '关系中积累了问题，需要及时沟通解决，否则会恶化。', health: '体内有旧疾或毒素，需要进行调理和清除。' },
        '临': { core: '亲临, 监察, 领导, 机会', career: '身居高位，亲自处理事务，能获得成功。', relationship: '需要更多地关心和投入到关系中，才能使其成长。', health: '身体需要得到重视和关照，不可掉以轻心。' },
        '观': { core: '观察, 瞻仰, 榜样, 审视', career: '应多观察学习，树立榜样，不宜轻举妄动。', relationship: '需要静静观察对方，深入了解，而不是盲目行动。', health: '审视自己的生活习惯，找出健康问题的根源。' },
        '噬嗑': { core: '咬合, 刑罚, 决断, 消除', career: '会遇到障碍，需要果断采取措施清除，甚至动用强硬手段。', relationship: '关系中的障碍需要被清除，长痛不如短痛。', health: '体内有阻碍之物，可能需要手术或强力药物来清除。' },
        '贲': { core: '装饰, 文饰, 美化, 表象', career: '注重外在形象和包装，能带来好处，但不可华而不实。', relationship: '关系中充满了浪漫和美好的点缀，但需关注内在的真实。', health: '注重外在的保养，但更要调理内在的根本。' },
        '剥': { core: '剥落, 侵蚀, 衰退, 顺势', career: '小人当道，君子退守，事业处于衰退期，应顺势而为。', relationship: '感情基础受到侵蚀，关系岌岌可危，需要保护核心。', health: '元气大伤，身体逐渐衰弱，应厚植根基。' },
        '复': { core: '回复, 归来, 初始, 生机', career: '事情出现转机，从错误中回归正轨，充满生机。', relationship: '关系重归于好，或回到初心，是新的开始。', health: '身体开始康复，元气逐渐恢复。' },
        '无妄': { core: '无妄, 真实, 自然, 意外', career: '顺其自然，不要有过多欲望，否则易有意外之灾。', relationship: '以诚相待，不要有过多算计，顺其自然发展。', health: '不要胡思乱想，保持心态平和，否则易生心病。' },
        '大畜': { core: '大积蓄, 止聚, 厚实, 蕴藏', career: '厚积薄发，积累了雄厚的实力，利于开创大事业。', relationship: '感情基础深厚，是开花结果的时候。', health: '精力充沛，身体底子好，非常健康。' },
        '颐': { core: '颐养, 养生, 言语, 饮食', career: '需要注意言行，防止口舌之非，同时也是休养生息的时期。', relationship: '关系需要滋养，注意沟通方式和互相的关怀。', health: '病从口入，祸从口出，需特别注意饮食和言语。' },
        '大过': { core: '大过, 非常, 颠覆, 独立', career: '处于非常时期，需要有非常的手段和担当，才能渡过难关。', relationship: '关系面临巨大考验，需要双方有坚定的意志。', health: '身体负担过重，处于崩溃边缘，需要立刻调整。' },
        '坎': { core: '险陷, 困难, 习坎, 诚信', career: '困难重重，危机四伏，但只要保持内心的诚信，终能克服。', relationship: '关系陷入困境，充满考验，需要用真诚来维系。', health: '病情严重，充满危险，但求生意志是关键。' },
        '离': { core: '附丽, 光明, 智慧, 依赖', career: '事业光明，前景美好，但需依附于正确的平台或领导。', relationship: '关系如火一般热烈，但需注意不要过于依赖对方。', health: '身体充满活力，但要注意上火、炎症等问题。' },
        '咸': { core: '感应, 迅速, 情感, 交流', career: '与合作伙伴或客户心意相通，项目进展迅速。', relationship: '是情感交流的绝佳时期，双方心有灵犀，感情升温。', health: '身心舒畅，对外界的良好感应有益健康。' },
        '恒': { core: '恒久, 持续, 稳定, 日常', career: '事业稳定发展，需要持之以恒的努力，方能长久。', relationship: '感情平淡而持久，是细水长流的幸福。', health: '健康状况稳定，保持良好的生活习惯是关键。' },
        '遁': { core: '退避, 隐退, 远离, 规避', career: '应远离小人与是非，退守自保，不是进攻的好时机。', relationship: '关系中出现问题，暂时分开或保持距离是明智之举。', health: '应避开有害的环境或人群，进行静养。' },
        '大壮': { core: '强盛, 壮大, 冲动, 谨慎', career: '力量强盛，但切忌鲁莽冲动，否则会由盛转衰。', relationship: '激情四射，但需防止因过于强势而伤害对方。', health: '精力过盛，容易横冲直撞而受伤，需谨慎。' },
        '晋': { core: '前进, 晋升, 光明, 发展', career: '事业发展迅速，有晋升之象，前途一片光明。', relationship: '感情发展顺利，关系更上一层楼。', health: '身体机能处于上升期，充满活力。' },
        '明夷': { core: '光明受伤, 黑暗, 韬晦, 忍耐', career: '才华被压制，环境黑暗，需要隐藏锋芒，忍耐等待。', relationship: '关系受到外界伤害或内部误解，需要忍耐。', health: '身体受到损伤，元气暗耗，需要静养。' },
        '家人': { core: '家庭, 内部, 秩序, 各司其职', career: '应首先处理好内部事务，团队各司其职，方能对外发展。', relationship: '家庭关系和谐的关键在于每个人都扮演好自己的角色。', health: '身体内部各器官协调工作，是健康的基础。' },
        '睽': { core: '乖离, 矛盾, 异中求同, 小事吉', career: '团队内部有矛盾，但能在小事上达成一致，大事难成。', relationship: '关系中存在分歧和疏远，但仍有共同点。', health: '身体阴阳失调，机能不协调。' },
        '蹇': { core: '艰难, 阻碍, 停滞, 反思', career: '前行遇阻，项目停滞，此时应停下来反思问题所在，寻求外援。', relationship: '关系陷入困境，沟通不畅，需要退一步审视彼此的问题。', health: '病情发展受阻，治疗遇到瓶颈，应寻求新的方法或专家意见。' },
        '解': { core: '缓解, 解除, 舒缓, 时机', career: '困难得到缓解，危机解除，是重新出发的好时机。', relationship: '关系中的矛盾得到化解，重归于好。', health: '病情好转，身体逐渐康复。' },
        '损': { core: '减损, 损失, 奉献, 抑制', career: '可能会有损失，但损下益上，长远看是好事。', relationship: '需要为对方付出和牺牲，才能维系关系。', health: '损有余而补不足，适当的“减损”（如减肥）有益健康。' },
        '益': { core: '增益, 利益, 帮助, 发展', career: '事业得到大的发展，有贵人相助，利益增加。', relationship: '感情得到升华，双方都能从关系中获益。', health: '身体得到滋养，健康状况得到改善。' },
        '夬': { core: '决断, 清除, 果决, 风险', career: '需要做出果断的决策，清除小人或障碍，但有风险。', relationship: '需要下定决心，解决关系中的根本问题。', health: '需要采取果断措施（如手术）来切除病灶。' },
        '姤': { core: '相遇, 邂逅, 阴长, 警惕', career: '会遇到意想不到的人或事，需警惕阴柔力量的侵蚀。', relationship: '可能会有不期而遇的恋情，但需谨慎对待。', health: '需警惕外邪的侵入，防止小病变大病。' },
        '萃': { core: '聚集, 精华, 汇合, 亨通', career: '人才或资源汇集，是团队发展的绝佳时机。', relationship: '感情深厚，亲朋好友齐聚，喜气洋洋。', health: '精气神汇聚，身体处于最佳状态。' },
        '升': { core: '上升, 晋升, 顺势, 成长', career: '事业循序渐进，不断上升，前景光明。', relationship: '感情稳步发展，逐渐升温。', health: '身体机能不断提升，越来越健康。' },
        '困': { core: '困顿, 艰难, 坚守, 等待', career: '事业陷入困境，资源匮乏，需要坚守信念，等待转机。', relationship: '关系陷入困境，缺乏活力，需要坚持。', health: '身体被疾病所困，需要顽强的意志力。' },
        '井': { core: '不变, 滋养, 公共, 奉献', career: '工作稳定，如同井水，默默奉献，滋养他人。', relationship: '感情平淡如水，但不可或缺，是生活的源泉。', health: '健康需要源源不断的滋养，不可断绝。' },
        '革': { core: '变革, 革命, 创新, 除旧', career: '到了必须改革的时候，除旧布新，才能有新的发展。', relationship: '关系需要彻底的改变，才能焕发生机。', health: '身体需要进行一次彻底的调理或改变不良习惯。' },
        '鼎': { core: '鼎盛, 稳定, 权力, 养贤', career: '事业达到鼎盛时期，地位稳固，应招揽贤才。', relationship: '关系稳固，如同三足鼎立，坚不可摧。', health: '身体强壮，根基稳固。' },
        '震': { core: '震动, 警醒, 奋起, 变动', career: '会有突发事件带来震动，是警醒和奋起的机会。', relationship: '关系会受到冲击，但也可能因此带来新的活力。', health: '身体会受到突然的冲击或惊吓，需保持镇定。' },
        '艮': { core: '停止, 静止, 适可而止, 专注', career: '应暂停目前的行动，静心思考，不宜再进。', relationship: '关系发展应暂时停止，给彼此一些空间。', health: '身体需要静养，不宜剧烈运动。' },
        '渐': { core: '渐进, 有序, 发展, 吉祥', career: '事业循序渐进，按部就班，终能成功。', relationship: '感情发展有条不紊，是水到渠成的好事。', health: '身体调理需要循序渐进，不可急于求成。' },
        '归妹': { core: '嫁娶, 终始, 无序, 警惕', career: '事情的开端和结尾可能不合常规，需警惕混乱的局面。', relationship: '关系发展不合常理，可能结局不佳，需谨慎。', health: '身体机能紊乱，阴阳失调。' },
        '丰': { core: '丰盛, 盛大, 光明, 守成', career: '事业达到顶峰，成就巨大，但需思考如何守成。', relationship: '感情生活丰富多彩，但需防止盛极而衰。', health: '精力极其旺盛，但需防止过度消耗。' },
        '旅': { core: '旅行, 漂泊, 不安, 孤独', career: '事业处于动荡不安的状态，四处奔波，缺乏根基。', relationship: '感情漂泊不定，缺乏归属感。', health: '身体状况不稳定，水土不服。' },
        '巽': { core: '顺从, 深入, 谦逊, 渗透', career: '应谦逊顺从，深入研究，方能获得成功。', relationship: '关系中需要顺从和温柔，才能深入发展。', health: '病邪已深入体内，需要顺势引导，不可强攻。' },
        '兑': { core: '喜悦, 言说, 交流, 和睦', career: '工作环境轻松愉快，利于沟通和交流。', relationship: '关系中充满了喜悦和甜蜜的言语。', health: '心情愉悦，有益于身体健康。' },
        '涣': { core: '涣散, 离散, 拯救, 重聚', career: '团队或人心涣散，需要重新凝聚力量，挽救危机。', relationship: '关系面临离散的风险，需要努力挽回。', health: '精气涣散，身体虚弱，需要收敛心神。' },
        '节': { core: '节制, 节约, 制度, 适度', career: '需要制定规则，节制开销，才能长久。', relationship: '关系需要有节制，过度的亲密或疏远都无益。', health: '饮食男女，皆需节制，方能健康。' },
        '中孚': { core: '诚信, 信任, 感化, 同心', career: '以诚信为本，能获得他人的信任与合作。', relationship: '关系的核心是信任，真诚能感化一切。', health: '心态真诚，信念坚定，是战胜疾病的法宝。' },
        '小过': { core: '小过错, 灵活, 变通, 低调', career: '可以有一些小的变通，但不宜有大的动作，应保持低调。', relationship: '关系中可以有一些无伤大雅的小插曲，但不能越过底线。', health: '身体有一些小问题，应及时调整，向下调养。' },
        '既济': { core: '已成功, 守成, 谨慎, 终乱', career: '事情已经成功，但需谨慎守成，防止由盛转衰。', relationship: '关系已达圆满，但需警惕潜在的危机。', health: '身体处于健康顶峰，但需预防未来的衰退。' },
        '未济': { core: '未成功, 发展, 希望, 谨慎', career: '革命尚未成功，同志仍需努力，未来充满希望。', relationship: '关系仍在发展中，尚未圆满，需谨慎前行。', health: '身体仍在恢复中，尚未痊愈，不可掉以轻心。' }
    };

    let currentName = '';
    let currentBirthdate = '';

    loadHistory();
    enterDivinationButton.addEventListener('click', switchToDivinationScreen);
    divineButton.addEventListener('click', performDivination);
    clearHistoryButton.addEventListener('click', clearHistory);

    function switchToDivinationScreen() {
        const name = nameInput.value.trim();
        const year = birthYearInput.value.trim();
        const month = birthMonthInput.value.trim();
        const day = birthDayInput.value.trim();

        if (!name || !year || !month || !day) {
            alert('请输入完整的姓名和生日信息。');
            return;
        }

        currentName = name;
        currentBirthdate = { year, month, day };

        userInfoScreen.style.display = 'none';
        divinationScreen.style.display = 'flex';
    }

    function clearHistory() {
        if (confirm('您确定要清除所有占卜历史吗？')) {
            localStorage.removeItem('divinationHistory');
            loadHistory();
            hexagramDisplay.classList.remove('visible');
            resultDisplay.classList.remove('visible');
            setTimeout(() => {
                hexagramDisplay.innerHTML = '';
                resultDisplay.innerHTML = '';
            }, 600);
        }
    }

    async function performDivination() {
        const question = questionInput.value.trim();

        if (!question) {
            alert('请输入您的问题。');
            return;
        }

        clickSound.play().catch(e => console.log("音效播放失败:", e));

        divineButton.disabled = true;
        divineButton.textContent = '占卜中...';
        
        resultDisplay.classList.remove('visible');
        hexagramDisplay.classList.remove('visible');
        
        setTimeout(() => {
            resultDisplay.innerHTML = '';
            hexagramDisplay.innerHTML = '';
            animationGif.style.display = 'block';
            const gifSrc = animationGif.src.split('?')[0];
            animationGif.src = `${gifSrc}?t=${new Date().getTime()}`;
            setTimeout(() => animationGif.style.opacity = 1, 10);
        }, 600);
        
        const lines = [];
        const lineGenerationDelay = 670;
        for (let i = 0; i < 6; i++) {
            await new Promise(resolve => setTimeout(resolve, lineGenerationDelay));
            const coin1 = Math.random() < 0.5 ? 2 : 3;
            const coin2 = Math.random() < 0.5 ? 2 : 3;
            const coin3 = Math.random() < 0.5 ? 2 : 3;
            const total = coin1 + coin2 + coin3;
            lines.push({
                value: total,
                isChanging: total === 6 || total === 9,
                type: total === 6 || total === 8 ? 'YIN' : 'YANG'
            });
        }

        animationGif.style.opacity = 0;
        setTimeout(async () => {
            animationGif.style.display = 'none';
            await calculateAndDisplayResult(lines, question, currentName, currentBirthdate);
        }, 500);
    }

    async function calculateAndDisplayResult(lines, question, name, birthdate) {
        const originalHexagramKey = lines.map(l => l.type === 'YANG' ? '1' : '0').join('');
        const changedHexagramKey = lines.map(l => {
            if (!l.isChanging) return l.type === 'YANG' ? '1' : '0';
            return l.type === 'YANG' ? '0' : '1';
        }).join('');

        const originalHexagram = hexagrams[originalHexagramKey];
        const changedHexagram = hexagrams[changedHexagramKey];
        const changingLines = lines.map((l, i) => ({ ...l, index: i })).filter(l => l.isChanging);

        if (!originalHexagram) {
            resultDisplay.innerHTML = `<p>错误：找不到与 ${originalHexagramKey} 对应的本卦信息。</p>`;
            resultDisplay.classList.add('visible');
            divineButton.disabled = false;
            divineButton.textContent = '开始占卜';
            return;
        }

        const hexagramHTML = lines.map(l => {
            if (l.value === 6) return CHANGING_YIN;
            if (l.value === 9) return CHANGING_YANG;
            if (l.value === 8) return YIN;
            return YANG;
        }).slice().reverse().join('<br>');

        let interpretation;
        let interpretationTitle;

        if (navigator.onLine) {
            try {
                const response = await fetch('/api/divine', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        question,
                        originalHexagram: {
                            name: originalHexagram.name,
                            symbol: originalHexagram.symbol,
                            meaning: originalHexagram.meaning
                        },
                        changedHexagram: {
                            name: changedHexagram.name,
                            symbol: changedHexagram.symbol,
                            meaning: changedHexagram.meaning
                        },
                        hasChangedHexagram: originalHexagramKey !== changedHexagramKey,
                        changingLines
                    })
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const aiResult = await response.json();
                interpretation = aiResult.html;
                interpretationTitle = `本卦 ${originalHexagram.name} (AI 解读)`;
            } catch (error) {
                console.error("API call failed, falling back to local interpretation.", error);
                const localResult = getAdvancedInterpretation(lines, originalHexagram, changedHexagram, question, name);
                interpretation = localResult.html;
                interpretationTitle = localResult.title + " (离线模式)";
            }
        } else {
            const localResult = getAdvancedInterpretation(lines, originalHexagram, changedHexagram, question, name);
            interpretation = localResult.html;
            interpretationTitle = localResult.title + " (离线模式)";
        }
        
        hexagramDisplay.innerHTML = hexagramHTML;
        hexagramDisplay.classList.add('visible');
        
        setTimeout(() => {
            resultDisplay.innerHTML = interpretation;
            resultDisplay.classList.add('visible');
            resultSound.play().catch(e => console.log("音效播放失败:", e));
        }, 500);

        saveToHistory({
            question: question,
            name: name,
            birthdate: birthdate,
            hexagram: hexagramHTML,
            result: interpretationTitle,
            fullResultHTML: interpretation,
            date: new Date().toLocaleString()
        });
        loadHistory();
        questionInput.value = '';
        
        divineButton.disabled = false;
        divineButton.textContent = '开始占卜';
    }

    function getAdvancedInterpretation(lines, original, changed, question, name) {
        if (!original) return { title: "错误", html: "<p>找不到对应的本卦信息。</p>" };
        
        const changingLines = lines.map((l, i) => ({ ...l, index: i })).filter(l => l.isChanging);
        const hasChangedHexagram = original !== changed;

        if (hasChangedHexagram && !changed) {
            return { title: "错误", html: "<p>找不到对应的之卦信息。</p>" };
        }

        let html = `<div class="interpretation">`;
        let title = `本卦 ${original.name}`;

        const tone = hexagramTones[original.name] || '中性';
        let openingStatement = '';
        switch (tone) {
            case '大吉':
                openingStatement = `尊敬的 ${name}，您所问之事，得此 ${original.name} 卦，可谓云开见日，前路光明。这是一个充满机遇与希望的预示。`;
                break;
            case '顺遂':
                openingStatement = `尊敬的 ${name}，关于您的问题，${original.name} 卦展现的是一幅顺遂和谐的景象。只要按部就班，便能水到渠成。`;
                break;
            case '挑战':
                openingStatement = `尊敬的 ${name}，心中所惑，遇 ${original.name} 卦，预示着前路或有挑战。但这正是考验您智慧与毅力的时刻，跨越之后，必有成长。`;
                break;
            case '警示':
                openingStatement = `尊敬的 ${name}，对于此事，${original.name} 卦给出了一个警示。此刻需谨言慎行，审时度势，方能避免不必要的困扰。`;
                break;
            case '等待':
                openingStatement = `尊敬的 ${name}，您所问之事，得 ${original.name} 卦，意在“等待”。时机未到，不可强求，静心积蓄力量是当下的最佳策略。`;
                break;
            case '转机':
                openingStatement = `尊敬的 ${name}，关于您的困惑，${original.name} 卦带来了转机的信号。困境即将过去，新的局面正在展开，请保持信心。`;
                break;
            default:
                openingStatement = `尊敬的 ${name}，您的问题，得 ${original.name} 卦，其中蕴含着深刻的哲理。`;
        }
        html += `<p class="personalized-advice"><strong>${openingStatement}</strong></p>`;

        const keywords = {
            'career': ['工作', '事业', '项目', '晋升', '求职', '财运'],
            'relationship': ['感情', '恋爱', '婚姻', '关系', '复合', '桃花'],
            'health': ['健康', '身体', '病情', '调养'],
        };
        let category = '您所问之事';
        let categoryKey = null;

        for (const key in keywords) {
            if (keywords[key].some(word => question.includes(word))) {
                category = `您所问的“${key === 'career' ? '事业' : (key === 'relationship' ? '感情' : '健康')}”`;
                categoryKey = key;
                break;
            }
        }

        html += `<p class="personalized-advice"><strong>针对${category}的启示：</strong></p>`;
        const originalMapping = hexagramMappings[original.name];
        if (originalMapping && categoryKey && originalMapping[categoryKey]) {
            html += `<p class="personalized-advice">${originalMapping[categoryKey]}</p>`;
        } else if (originalMapping) {
            html += `<p class="personalized-advice">此卦的核心意象是“${originalMapping.core}”。请将此意象与您所问之事相结合，细心体悟。</p>`;
        }

        if (hasChangedHexagram) {
             html += `<p class="personalized-advice">当前状况将向 ${changed.name} 卦演变，这揭示了未来的发展方向。请留意这种转变的趋势。</p>`;
        }

        let advice = '';
        const changedMapping = hasChangedHexagram ? hexagramMappings[changed.name] : null;

        switch (changingLines.length) {
            case 0:
                advice = `当前状况稳定，核心在于理解 ${original.name} 卦的整体意涵。建议您根据前面提到的“${originalMapping.core}”核心意象来制定策略，保持现状，稳步前行。`;
                break;
            case 1:
                title += ` 变 ${changingLines[0].index + 1}爻`;
                advice = `事情的关键转折点已经出现。您需要特别关注当前行动中的某个特定环节。综合来看，建议您依据 ${original.name} 卦的总体趋势，并针对性地做出调整，以顺利过渡到 ${changed.name} 卦所预示的未来。`;
                break;
            case 2:
                advice = `情况正在变化，未来尚不明朗。建议您采取灵活策略，一方面要处理好 ${original.name} 卦所揭示的当前问题，另一方面要为迎接 ${changed.name} 卦的到来做好准备。行动上应更为谨慎，多观察，少冒进。`;
                break;
            case 3:
                advice = `这是一个重要的转折时期。您当前的处境（${original.name}卦）即将过去，未来（${changed.name}卦）的方向已经比较明确。建议您开始着手准备，根据 ${changedMapping.core} 的核心意象来规划下一步行动。`;
                break;
            case 4:
            case 5:
                advice = `局势即将迎来根本性的转变。现在不宜再过多纠结于现状，而应将目光投向未来。${changed.name} 卦（${changedMapping.core}）揭示了最终的结果，建议您直接围绕这个最终目标来调整和行动。`;
                break;
            case 6:
                advice = `情况发生了彻底的改变，过去的经验已不适用。您需要完全以新的视角来审视问题。${changed.name} 卦（${changedMapping.core}）是您当前行动的唯一指南，请果断地抛弃旧有模式，采取全新的策略。`;
                break;
        }
        
        html += `<p class="personalized-advice"><strong>综合建议：</strong>${advice}</p>`;
        html += `</div>`;
        return { title, html };
    }

    function saveToHistory(entry) {
        let history = JSON.parse(localStorage.getItem('divinationHistory')) || [];
        history.unshift(entry);
        if (history.length > 20) history.pop();
        localStorage.setItem('divinationHistory', JSON.stringify(history));
    }

    function loadHistory() {
        historyList.innerHTML = '';
        let history = JSON.parse(localStorage.getItem('divinationHistory')) || [];
        
        if (history.length === 0) {
            const li = document.createElement('li');
            li.textContent = '暂无占卜历史。';
            li.style.textAlign = 'center';
            li.style.color = '#999';
            historyList.appendChild(li);
            clearHistoryButton.style.display = 'none';
            return;
        }

        clearHistoryButton.style.display = 'inline-block';
        history.forEach((entry) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${entry.date}</strong><br>
                            <em>${entry.name} 问: ${entry.question}</em><br>
                            <span>结果: ${entry.result}</span>`;
            li.addEventListener('click', () => {
                currentName = entry.name || '';
                currentBirthdate = entry.birthdate || { year: '', month: '', day: '' };
                
                nameInput.value = currentName;
                birthYearInput.value = currentBirthdate.year;
                birthMonthInput.value = currentBirthdate.month;
                birthDayInput.value = currentBirthdate.day;
                questionInput.value = entry.question || '';
                
                userInfoScreen.style.display = 'none';
                divinationScreen.style.display = 'flex';

                animationGif.style.display = 'none';
                animationGif.style.opacity = 0;
                resultDisplay.classList.remove('visible');
                hexagramDisplay.classList.remove('visible');
                
                setTimeout(() => {
                    hexagramDisplay.innerHTML = entry.hexagram;
                    resultDisplay.innerHTML = entry.fullResultHTML;
                    hexagramDisplay.classList.add('visible');
                    resultDisplay.classList.add('visible');
                }, 100);
            });
            historyList.appendChild(li);
        });
    }
});
