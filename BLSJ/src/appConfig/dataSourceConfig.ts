export const       E_REPORT = {
    mEventType: [
    {ECodeValue: '0', ECodeTag: '选择插入类别', category: '默认值'},
    {ECodeValue: '1', ECodeTag: '药物错误', category: '类别'},
    {ECodeValue: '2', ECodeTag: '单次剂量错误', category: '类别'},
    {ECodeValue: '3', ECodeTag: '给药途径错误', category: '类别'},
    {ECodeValue: '4', ECodeTag: '给药时间错误', category: '类别'},
    {ECodeValue: '5', ECodeTag: '给药频次错误', category: '类别'},
    {ECodeValue: '112', ECodeTag: '其他', category: '类别'}
    ],
    eventLevel: [
    {ECodeValue: '129', name: 'I级事件(警告事件)', desc: '指患者非预期的死亡，或是非疾病自然进展过程中造成永久性功能丧失的事。'},
    {ECodeValue: '130', name: 'II级事件(不良后果事件)', desc: '指在疾病医疗过程中是因诊疗活动而非疾病本身造成的病人机体与功能损害的事件。'},
    {ECodeValue: '131', name: 'III级事件(无后果事件)', desc: '指虽然发生了错误事实，但未给患者机体与功能造成任何伤害，或轻微损害不需处理可完全康复的事件。'},
    {ECodeValue: '122', name: 'IV级事件(隐患事件)', desc: '指由于及时发现错误，而未形成事实的事件。'}
    ]
}
export const         EVENT_AUDIT= {
    UNCHECKED: [
    {name: '事件编号', key: 'EveresId'},
    {name: '事件类别', key: 'EveresName'},
    {name: '事件等级', key: 'EveresLevel'},
    {name: '发生日期', key: 'HappenedDate'},
    {name: '上报日期', key: 'SendtoDate'},
    {name: '科室', key: 'HospDepId'},
    {name: '反馈', key: 'FeedbackState', state: 'important'},
    {name: '上报状态', key: 'ExamineState', state: 'important'}
    ]
}
export const         HURT_ITEM = {
    DamageArea: "",
    DamageName: "",
    DamageSite: "",
    DisplayOrder: 0,
    MeterHeight: 0,
    MeterLength: 0,
    MeterWidth: 0,
    PartsId: "",
    PartsImg: 0,
    PartsName: "0",
    QhDepth: "0",
    QhPoint: "0",
    Staging: 0
}
export const         EVENT_REPORT_FORMS={
    EVENT_COUNTS_OF_DEPARTMENTS:[
    {name:'科室',key:'HospDepName'},
    {name:'压疮评估',key:'yc'},
    {name:'其他事件',key:'qt'},
    {name:'零事件',key:'lsj'},
    {name:'跌倒坠床',key:'ddzc'},
    {name:'管路事件',key:'gl'},
    {name:'隐患事件',key:'yh'},
    {name:'给药事件',key:'gy'},
    {name:'职业暴露',key:'zybl'},
    {name:'合计',key:'hj'}
    ]
    ,EVENT_LIST:[
    {name: '事件编号', key: 'EveresId'},
    {name: '事件类别', key: 'EveresName'},
    {name: '事件等级', key: 'EveresLevel'},
    {name: '发生日期', key: 'HappenedDate'},
    {name: '上报日期', key: 'SendtoDate'},
    {name: '医院', key: 'HospId'},
    {name: '科室', key: 'HospDepId'},
    ]
    ,HOSP_LIST:[
    {name: '医院编号', key: 'HospId'},
    {name: '医院名称', key: 'HospName'},
    {name: '医院等级', key: 'Grade'},
    {name: '上报事件数量', key: 'EveCount'}    
    ]
    ,DEPARTMENT_LIST:[
    {name: '科室名称', key: 'HospdepName'},
    {name: '上报事件数量', key: 'EveCount'}    
    ]

    ,OTHER_DETAIL_LIST:[
    {name: '月份', key: 'yue'},
    {name: '误吸/窒息事件', key: '157'},
    {name: '输血事件', key: '158'},
    {name: '烧烫伤事件', key: '159'},
    {name: '冻伤事件', key: '160'},
    {name: '输液外渗', key: '161'},
    {name: '走失事件', key: '162'},
    {name: '自杀事件', key: '163'},
    {name: '病理标本事件', key: '164'},
    {name: '检验标本事件', key: '165'},
    {name: '电击伤事件', key: '166'},
    {name: '毒麻管制药品事件', key: '167'},
    {name: '伤医事件', key: '168'},
    {name: '其他事件', key: '112'}
    ]
    ,OTHER_OTHER_DETAIL_LIST:[
    {name: '事件名称', key: 'DetailTypeQt'},
    {name: '数量', key: 'ccc'}
    ]
    ,EVENT_RATIO_LIST:[
    {name: '事件名称', key: 'Name'},
    {name: '数量', key: 'Value'},
    {name: '百分比', key: 'Ratio'},
    ]

}

export const         DEDAIL_FORMS={
    DEDAIL_LIST:[
    {name:'统计因子',key:'Name'},
    {name:'数量',key:'Value'},
    {name:'百分比',key:'Ratio'}
    ]
}

export const         INDEX_PROVINCE={
    ENVENT_COUNTS_MONTHS:[
    {name:'月份',key:'yue'},
    {name:'压疮评估',key:'yc'},
    {name:'其他事件',key:'qt'},
    {name:'跌倒坠床',key:'ddzc'},
    {name:'管路事件',key:'gl'},
    {name:'隐患事件',key:'yh'},
    {name:'给药事件',key:'gy'},
    {name:'职业暴露',key:'zybl'},
    {name:'零事件',key:'lsj'},
    {name:'合计',key:'hj'}
    ]
}

export const         EVENT_LEVEL=
[{value:"110",text:"所有等级"},{value:"129",text:"I级事件"},{value:"130",text:"II级事件"},{value:"131",text:"III级事件"},{value:"122",text:"IV级事件"},{value:"--",text:"无"}]

export const         EVENT_TYPE=[{value:"110",text:"所有事件"},{value:"149",text:"压疮评估"},{value:"150",text:"其他事件"},{value:"151",text:"零事件"},{value:"152",text:"跌倒坠床"},{value:"153",text:"管路事件"},{value:"154",text:"隐患事件"},{value:"155",text:"给药事件"},{value:"156",text:"职业暴露"}]
export const        HOSP_LEVEL=[{value:"110",text:"所有"},{value:"1",text:"三级"},{value:"2",text:"二级"},{value:"3",text:"一级"}]
export const         HOSP_GRADE=[{value:"110",text:"所有"},{value:"0",text:"特等"},{value:"1",text:"甲等"},{value:"2",text:"乙等"},{value:"3",text:"丙等"}]

export const         USER_MANAGE={
    DEPARTMENT_ADMIN:[
    {name:'科室编码',key:'HospdepId'},
    {name:'科室名称',key:'HospdepName'},
    /*{name:'检索码',key:'SpellNo'},*/
    {name:'操作时间',key:'OperatorDate'}
    ],
    USER_ADMIN:[
    {name:'用户编码',key:'ReguserId'},
    {name:'登录账号',key:'LoginName'},
    {name:'所属科室',key:'HospdepName'},
    {name:'姓名',key:'Name'},
    {name:'性别',key:'Sex'},
    {name:'电话',key:'Phone'},
    {name:'角色',key:'RoleState'}
    ]
}