import { slideAnimation } from '../config/motion';
import { EditorTabs } from '../config/constants';
import { motion } from 'framer-motion';
import { AiPicker, ColorPicker, FilePicker, Tab } from '.'


const TabLeftSide = ({ setActiveEditorTab, activeEditorTab }) => {

    // show tab content depending on the activeTab
    const generateTabContent = () => {

        switch (activeEditorTab) {

            case "colorPicker":
                return <ColorPicker />

            case "filePicker":
                return <FilePicker file={file} setFile={setFile} readFile={readFile} />

            case "aiPicker":
                return <AiPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />

            default:
                return null;
        }
    }


    return (
        <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
        >
            <div className="flex items-center min-h-screen">
                <div className="editorTabs-container tabs">
                    {
                        EditorTabs.map((tab) => (
                            <Tab
                                tab={tab}
                                key={tab.name}
                                handleClick={() => setActiveEditorTab(tab.name)}
                            />
                        ))
                    }

                    {
                        generateTabContent()
                    }

                </div>
            </div>
        </motion.div>
    )
}

export default TabLeftSide