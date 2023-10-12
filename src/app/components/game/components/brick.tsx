

export default function Brick(props:{flag:number}){
    const {flag} = props;

    return flag===0? 
    <div className="h-7 w-7 m-1 bg-slate-900"></div>:
    <div className="h-7 w-7 m-1 bg-slate-50"></div>
}