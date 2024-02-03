import {commonFontStyle} from "../../util";

export const BlockTitle = ({text}) => {
    return <h3 style={{...commonFontStyle}}>
        {text}
    </h3>
}