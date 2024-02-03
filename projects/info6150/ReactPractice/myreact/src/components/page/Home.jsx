import {Header} from "../layout/Header";
import {Tabs} from "../layout/Tabs";
import {HomePage} from "./HomePage";
import {Footer} from "../layout/Footer";

export const Home = () => {

    const tabs = ['Home', 'Contact', 'New Page1', 'New Page2', 'New Page3'];

    return <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        overflowY: 'auto',
        backgroundColor: '#080808',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <Header title={'Title'} subTitle={'Enter subtitle'} backgroundImage={`url(/img/earth.jpg)`}/>
        <Tabs tabs={tabs}/>
        <HomePage/>
        <Footer/>
    </div>
}