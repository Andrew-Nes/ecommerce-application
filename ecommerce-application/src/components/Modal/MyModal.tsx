import './modal.scss'
interface MyModalProps {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    children?: React.ReactNode | string
}

const MyModal = ({active, setActive, children}: MyModalProps) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={()=> setActive(false)}>
            <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal