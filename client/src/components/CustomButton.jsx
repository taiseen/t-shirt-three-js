import { getContrastingColor } from '../config/helpers';
import { useSnapshot } from 'valtio';
import state from '../store';


const CustomButton = ({ type, title, customStyles, handleClick }) => {

    const snap = useSnapshot(state);


    const generateStyle = (type) => {
        if (type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if (type === "outline") {
            return {
                borderWidth: '1px',
                borderColor: snap.color,
                color: snap.color
            }
        }
    }


    return (
        <button
            onClick={handleClick}
            style={generateStyle(type)}
            className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
        >
            {title}
        </button>
    )
}

export default CustomButton;