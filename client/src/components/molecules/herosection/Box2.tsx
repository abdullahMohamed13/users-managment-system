// import Title from "@/components/atoms/herosection/Title"
// import Text from "@/components/atoms/herosection/Text"
import Title from "@/components/atoms/Title"
import Text from "@/components/atoms/Text"
import Box1 from "./Box1"

export default function Box2(){

return(
<div className="w-[640px] h-[402px]  flex flex-col justify-center  gap-4">
    {/* <Title size="xxxxxl" className="ds-font-semibold ds-font-heading w-[655px] text-left " color="primary" >
        Turn <span className="ds-text-alt">Questions</span> into Clarity  
        and Transform <span className="ds-text-alt">Responses</span> into Valuable Insights 
        
          */}
          <Title size="xxl" variant="black"  className = "p-0 capitalize font-semibold text-left" >
            Turn <span className="ds-text-alt">Questions</span> into Clarity 
            and Transform <span className="ds-text-alt">Responses</span> into Valuable Insights
           
            
            
              
          </Title>
    {/* </Title> */}

    
    {/* <Text size="lg"  className="text-left"> 
        Effortlessly build surveys that deliver the 
        <br/> answers you need to grow, improve, and 
        <br/> connect with your audience.
    </Text> */}
    <Text size="lg" className="text-left" variant="disabled" >
        Effortlessly build surveys that deliver the 
        <br/> answers you need to grow, improve, and 
        <br/> connect with your audience.
    </Text>
    
    <Box1    />
    
</div>

)

}


