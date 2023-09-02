export interface IModal {
    isOpen: boolean,
    onClose: React.Dispatch<React.SetStateAction<any>>,
    title: string,
    readonly children: React.ReactNode| React.ReactNode[],
}