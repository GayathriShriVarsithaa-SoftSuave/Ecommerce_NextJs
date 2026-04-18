export const generateDes=(des:string):string=>{
    if(des.length>90){
        return (des.slice(0,90)+"...")
    }
    return des;
}