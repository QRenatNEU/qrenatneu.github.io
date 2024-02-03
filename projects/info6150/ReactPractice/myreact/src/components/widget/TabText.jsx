import {commonFontStyle} from "../../util";

export const TabText = ({text}) => {
    return <p style={{...commonFontStyle, paddingLeft: 48, paddingRight: 48}}>
        {text}
    </p>
}