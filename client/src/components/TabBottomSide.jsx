import { slideAnimation } from '../config/motion';
import { FilterTabs } from '../config/constants';
import { motion } from 'framer-motion';
import { Tab } from '.';



const TabBottomSide = ({ activeFilterTab, setActiveFilterTab }) => {


    const handleActiveFilterTab = (tabName) => {

        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        // after setting the state, activeFilterTab is updated

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    return (
        <motion.div
            className='filterTabs-container'
            {...slideAnimation("up")}
        >
            {
                FilterTabs.map((tab) => (
                    <Tab
                        tab={tab}
                        key={tab.name}
                        isFilterTab
                        isActiveTab={activeFilterTab[tab.name]}
                        handleClick={() => handleActiveFilterTab(tab.name)}
                    />
                ))
            }
        </motion.div>
    )
}

export default TabBottomSide