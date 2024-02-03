import {HeaderTitle} from "../widget/HeaderTitle";
import {HeaderSubTitle} from "../widget/HeaderSubTitle";
import Divider from "../widget/Divider";
import {commonFontStyle} from "../../util";

export const Footer = () => {

    return <div style={{width: '100%', height: '10vh', textAlign: 'start', paddingLeft: 80, paddingTop: 32}}>
        <Divider/>
        <p style={{...commonFontStyle, textAlign: 'center'}}>Copyright: @Qi</p>
    </div>
}