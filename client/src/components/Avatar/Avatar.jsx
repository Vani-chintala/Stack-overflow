
const Avatar=({children,backgroundColor,px,py,borderRadius,color,fontSize,cursor})=>{
    const style1={
        backgroundColor,
        padding:`${py} ${px}`,
        color:color ||"black",
        borderRadius,
        fontSize,
        textAlign: "center",
        cursor: cursor||null,
        textDecoration: "none"
    }
    return(
     <div style={style1}>
        {children} 
        {/* here children is props from  Navbar.jsx */}
     </div>
    )
}
export default Avatar 

