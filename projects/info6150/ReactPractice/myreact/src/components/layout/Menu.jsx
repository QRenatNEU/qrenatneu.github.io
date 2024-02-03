import {BlockTitle} from "../widget/BlockTitle";
import {commonFontStyle} from "../../util";

export const Menu = ({title, items}) => {
    return <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
        <BlockTitle text={title}/>
        <ul>
            {
                items.map((item, idx) => {
                    return <li key={idx} style={{...commonFontStyle}}><a style={{...commonFontStyle}} href={'/'}>{item}</a></li>
                })
            }
        </ul>
    </div>
}