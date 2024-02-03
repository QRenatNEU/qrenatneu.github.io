import {BlockTitle} from "../widget/BlockTitle";
import {commonFontStyle} from "../../util";
import {BlockText} from "../widget/BlockText";
import Divider from "../widget/Divider";

export const Block = ({title, text, withDivider, child}) => {
    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'start', padding: 16}}>
        <BlockTitle text={title}/>
        {withDivider && <Divider/>}
        <BlockText text={text}/>
        {child && child}
    </div>
}