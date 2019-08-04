/**
 * Created by miyaye on 2019/8/3.
 * 数据库不论实例化多少次 只连接一次 使用static 实现
 */
class Db{
    static getInstance(){/*单例, 保证实例化只有一次*/
        if(!Db.instance){
            return new Db();
        }
        return Db.instance;
    }
    constructor(){
        console.log('DB实例化');
        this.connect()
    }
    connect(){
        console.log('DB连接');
    }
    find(){
        console.log('DB查找');
    }
}

var myDb1 = Db.getInstance();
var myDb2 = Db.getInstance();