import { AiPicker, ColorPicker, CustomButton, FilePicker, TabBottomSide, TabLeftSide } from '../components';
import { DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { download } from '../assets';
import config from '../config/config';
import state from '../store';


const Customizer = () => {

    const snap = useSnapshot(state);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    })


    const handleSubmit = async (type) => {

        if (!prompt) return alert("Please enter a prompt");

        try {
            setGeneratingImg(true);

            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                })
            })

            const data = await response.json();

            handleDecals(type, `data:image/png;base64,${data.photo}`)
        } catch (error) {
            alert(error)
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    }


    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }


    const readFile = (type) => {
        reader(file)
            .then((result) => {
                handleDecals(type, result);
                setActiveEditorTab("");
            })
    }


    return (
        <AnimatePresence>
            {
                !snap.intro && (
                    <>

                        <TabLeftSide
                            activeEditorTab={activeEditorTab}
                            setActiveEditorTab={setActiveEditorTab}
                        />


                        <motion.div
                            className="absolute z-10 top-5 right-5"
                            {...fadeAnimation}
                        >
                            <CustomButton
                                type="filled"
                                title="Go Back"
                                handleClick={() => state.intro = true}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                            />
                        </motion.div>


                        <TabBottomSide
                            activeFilterTab={activeFilterTab}
                            setActiveFilterTab={setActiveFilterTab}
                        />

                    </>
                )
            }
        </AnimatePresence>
    )
}

export default Customizer