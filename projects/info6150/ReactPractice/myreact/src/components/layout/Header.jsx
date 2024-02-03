import {HeaderTitle} from "../widget/HeaderTitle";
import {HeaderSubTitle} from "../widget/HeaderSubTitle";

export const Header = ({title, subTitle, backgroundImage}) => {

    return <div style={{width: '100%', height: '30vh', textAlign: 'start', paddingLeft: 80, paddingTop: 32, backgroundImage: backgroundImage, backgroundSize: 'cover'}}>
        {/*<img style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '32vh', objectFit: 'cover', zIndex: 0}} src={backgroundImage}></img>*/}
        <div style={{position: 'relative', zIndex: 2}}>
            <HeaderTitle text={title}/>
            <HeaderSubTitle text={subTitle}/>
        </div>
    </div>
}