// export const serviceName:string = "http://192.168.0.100:9400/Aers.svc/";
export const serviceName:string = "http://zh.buzzlysoft.com/Aers.svc/";
// export const serviceName:string = "http://zhihu.buzzlysoft.com/Aers.svc/";

// export const base:string = "http://192.168.0.100:9400/";
export const base:string = "http://zh.buzzlysoft.com/";
// export const base:string = "http://zhihu.buzzlysoft.com/";


//服务
        // export const LOGIN:string = base +  '/Aers.svc/login';
        // export const REGIST:string = base +  '/Aers.svc/Registeruser';
        // export const UPDATEPWD:string = base +  '/Aers.svc/UpdatePwd';
        // export const FORGETPWD:string = base +  '/Aers.svc/ForgetPwd';

        // export const IMG_HANDLER:string = base + '/ImgHandler.ashx';

export const         HOME= {
            login: serviceName + 'loginNew',
            index: serviceName + 'getevecounts',
            index_province: serviceName + 'GetEventsresumeByCount',
            event_count_all_state: serviceName + 'GetIsEveCountByDep'

        }
export const        HOME_EXCEL= {
            index_province: serviceName + 'GetEventsresumeByCountexcel'
        }
export const        HOME_EXCEL_SY= {
            index_province: serviceName + 'GetEventsresumeByCountSYexcel'
        }
        //提交8大事件
export const        SUBMIT_EVENT= {
            FALL: serviceName + 'pushddzcNew',//跌倒坠床
            MEDICINE: serviceName +'pushgyNew',//给药事件
            TUBE: serviceName + 'pushglNew',//管路事件
            PRESSURE: serviceName + 'pushycNew',//压疮
            OCCUPATION_EXPOSE: serviceName + 'pushzyblNew',//职业暴露
            OTHER:serviceName + 'pushqtNew',//其它事件
            // HIDDENDANGER:serviceName + 'pushyh',//隐患事件（已废除）
            ZERO:serviceName + 'simply',//零事件
            ORTHERS_SUBMITED_OR_NOT:serviceName + 'findnurswaitData',//零事件上报前检查是否上报过其它类的事件
            ZERO_SUBMITED_OR_NOT:serviceName + 'checkonekey',//查看是否已上报零事件
        }
        //请求加载事件数据
export const        LOAD_EVENT_DATA= {
            FALL: serviceName + 'findddzcinfo',//跌倒坠床信息
            PRESSURE_ULCERS: serviceName + 'findycinfo',//压疮信息
            ZERO: serviceName + 'findonekeyinfo',//零事件
            TUBE: serviceName + 'findglinfo',//管路事件
            HIDDEN_DANGER: serviceName + 'findyhinfo',
            MEDICINE: serviceName + 'findgyinfo',//给药
            OCCUPATION_EXPOSE: serviceName + 'findzyblinfo',//职业暴露
            OTHERS: serviceName + 'findqtinfo'//其它事件
        }
export const        LOAD_EVENT_LIST= {
            WAIT: serviceName + 'findndepwaitNew',//待审核事件
            PASS: serviceName + 'findndepevent',//已审核的事件
            NOT_PASS: serviceName + 'findndepnoevent',//被拒绝的事件
            ALL:serviceName + 'findndepallevent',//获取个人上报记录
            RECORD:serviceName + 'findndepRecord',//获取该科室已通过和未通过的事件
            PASS_EVENT: serviceName + 'exevent',
            FADE_BACK_EVENT: serviceName + 'unexevent'
        }
export const        LOAD_EVENT_LIST_EXCEL= {
            WAIT: serviceName + 'findndepwaitexcel',
            PASS: serviceName + 'findndepeventexcel',
            NOT_PASS: serviceName + 'findndepnoeventexcel',

        }
export const        DELETE_EVENT_LIST={
            DELETE_EVENT:serviceName+'DeleteEventsresume'
        }
export const        DRAFTS_LIST= {
            DRAFTS: serviceName + 'findndepreport'
        }
export const        DRAFTS_LIST_EXCEL ={
            DRAFTS: serviceName + 'findndepreportexcel'
        }

export const        LOAD_REPORT_LIST= {
            DEPARTMENT_EVENT_COUNT: serviceName + 'GetEventsresumeByhospdepCount',

            EVENT_LIST: serviceName + 'findproevent',
            REGION: serviceName + 'GetRegion',
            HOSP: serviceName + 'Gethospital',

            HOSP_LIST: serviceName + 'GetEveCountByhospital',

            DEPARTMENT_LIST: serviceName + 'GetEveCountByhospdep',

            OTHER_DETAIL_LIST: serviceName + 'GetEventQtByCount',

            OTHER_OTHER_DETAIL_LIST: serviceName + 'FindGroupByName',

            EVENT_RATIO_LIST: serviceName + 'GetEventReport',



        }

export const        LOAD_REPORT_LIST_EXCEL= {
            DEPARTMENT_EVENT_COUNT: serviceName + 'GetEventsresumeByhospdepCountexcel',

            EVENT_LIST: serviceName + 'findproeventexcel',
            REGION: serviceName + 'GetRegionexcel',
            HOSP: serviceName + 'Gethospitalexcel',

            HOSP_LIST: serviceName + 'GetEveCountByhospitalexcel',

            DEPARTMENT_LIST: serviceName + 'GetEveCountByhospdepexcel',

            OTHER_DETAIL_LIST: serviceName + 'GetEventQtByCountexcel',

            OTHER_OTHER_DETAIL_LIST: serviceName + 'FindGroupByNameexcel',

            EVENT_RATIO_LIST: serviceName + 'GetEventReportexcel',



        }

export const        LOAD_DETAIL_FORM= {
            FALL: serviceName + 'GetEventddzcReport',
            FallingBed: serviceName + 'GetEventZcReport',
            HiddenDanger: serviceName + 'GetEventddzcReport',
            Medicine: serviceName + 'GetEventGyReport',
            OccupationExpose: serviceName + 'GetEventZyblReport',
            Other: serviceName + 'GetEventddzcReport',
            Pressureulcers: serviceName + 'GetEventYcReport',
            Tube: serviceName + 'GetEventGlReport',

        }
export const        LOAD_DETAIL_FORM_EXCEL={
            FALL: serviceName + 'GetEventddzcReportexcel',
            FallingBed: serviceName + 'GetEventZcReportexcel',
            HiddenDanger: serviceName + 'GetEventddzcReportexcel',
            Medicine: serviceName + 'GetEventGyReportexcel',
            OccupationExpose: serviceName + 'GetEventZyblReportexcel',
            Other: serviceName + 'GetEventddzcReportexcel',
            Pressureulcers: serviceName + 'GetEventYcReportexcel',
            Tube: serviceName + 'GetEventGlReportexcel',

        }


export const        GET_DATA_SOURCE= serviceName + 'statecode'
export const        GET_HOSPITAL_INFO= serviceName + 'gethosps'
export const        EVENT_REPORT=serviceName+'findnurswaitData'

export const        USER_MANAGE={
            CHANGE_PASSWORD:serviceName+'UpdatePwd',
            USER_ADMIN_LIST:serviceName+'GetRegistereduserByHospId',
            DEPARTMENT_ADMIN_LIST:serviceName+'hospdepFindByHospId',
            UPDATE_USER:serviceName+'UpdateUser',
           // REGISTER_USER:serviceName+'Registeruser',
            REGISTER_USER:serviceName+'RegisterAdduser',
            USER_EXIST_OR_NOT:serviceName+'Registeruser',
            UPDATE_DEPARTMENT:serviceName+'Addhospdep',




           // DEPARTMENT_LIST_HOSP:serviceName+'hospdepFindByHospId',
        }
export const IMG_HANDLER:string = base + 'ImgHandler.ashx';
