export interface IModal {
    isOpen: boolean,
    onClose: React.Dispatch<React.SetStateAction<any>>,
    title: string,
    children: React.ReactNode| React.ReactNode[],
}