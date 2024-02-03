import {TabText} from "../widget/TabText";

export const Tabs = ({tabs}) => {

    return <div style={{
        backgroundColor: '#303030',
        height: '5vh',
        width: '100vw',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
    }}>
        {tabs.map((tab, idx) => {
            return <div style={{
                cursor: 'pointer', height: '5vh', borderRight: '1.5px solid grey',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
            }}>
                <TabText text={tab} key={idx}/>
            </div>
        })}
    </div>
}