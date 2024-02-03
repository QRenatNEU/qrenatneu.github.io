import {Menu} from "../layout/Menu";
import {Block} from "../layout/Block";
import VerticalDivider from "../widget/VerticalDivider";
import {Button} from "../widget/Button";

export const HomePage = () => {

    const menuItems = ['Menu Item', 'Menu Item', 'Menu Item', 'Menu Item', 'Menu Item', 'Menu Item', 'Menu Item', ]
    const text = 'In the heart of a bustling city, under the shadow of towering skyscrapers.';
    const longtext = 'In the heart of a bustling city, under the shadow of towering skyscrapers.In the heart of a bustling city, under the shadow of towering skyscrapers.In the heart of a bustling city, under the shadow of towering skyscrapers.In the heart of a bustling city, under the shadow of towering skyscrapers.';

    return <div style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', width: '20vw'}}>
            <Menu title={'Main Menu'} items={menuItems}/>
            <Block title={'Block'} text={text}/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', width: '80vw'}}>
            <Block withDivider={true} title={'Block'} text={longtext}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Block title={'Block'} text={longtext} child={<Button text={'Read more'}/>}/>
                <VerticalDivider/>
                <Block title={'Block'} text={longtext} child={<Button text={'Read more'}/>}/>
            </div>
        </div>
    </div>
}