import { DefaultImageToolbar, DefaultVideoToolbar, TLUiImageToolbarProps, TLUiVideoToolbarProps } from 'tldraw'

const imageStyle = `[data-testid="tool.image-alt-text"] { display: none !important; }`
const videoStyle = `[data-testid="tool.video-alt-text"] { display: none !important; }`

export function CustomImageToolbar({ children }: TLUiImageToolbarProps) {
    return (
        <>
            <style>{imageStyle}</style>
            <DefaultImageToolbar>{children}</DefaultImageToolbar>
        </>
    )
}

export function CustomVideoToolbar({ children }: TLUiVideoToolbarProps) {
    return (
        <>
            <style>{videoStyle}</style>
            <DefaultVideoToolbar>{children}</DefaultVideoToolbar>
        </>
    )
}
