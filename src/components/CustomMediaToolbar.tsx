import { track, useEditor, useValue } from '@tldraw/editor'
import {
    DefaultImageToolbar,
    DefaultImageToolbarContent,
    DefaultVideoToolbar,
    DefaultVideoToolbarContent,
    TldrawUiButtonIcon,
    TldrawUiToolbarButton,
    useTranslation,
} from 'tldraw'

const imageStyle = `[data-testid="tool.image-alt-text"] { display: none !important; }`
const videoStyle = `[data-testid="tool.video-alt-text"] { display: none !important; }`

function DeleteButton({ shapeId }: { shapeId: string }) {
    const editor = useEditor()
    const msg = useTranslation()
    return (
        <TldrawUiToolbarButton
            type="icon"
            title={msg('action.delete')}
            onClick={() => editor.deleteShapes([shapeId as any])}
        >
            <TldrawUiButtonIcon small icon="trash" />
        </TldrawUiToolbarButton>
    )
}

export const CustomImageToolbar = track(function CustomImageToolbar() {
    const editor = useEditor()

    const imageShapeId = useValue('imageShape', () => {
        const shape = editor.getOnlySelectedShape()
        if (!shape || shape.type !== 'image') return null
        return shape.id
    }, [editor])

    const isInCropTool = useValue('inCrop', () => editor.isIn('select.crop.'), [editor])

    if (!imageShapeId) return null

    return (
        <>
            <style>{imageStyle}</style>
            <DefaultImageToolbar>
                <DefaultImageToolbarContent
                    imageShapeId={imageShapeId}
                    isManipulating={isInCropTool}
                    onEditAltTextStart={() => {}}
                    onManipulatingStart={() => editor.setCurrentTool('select.crop.idle')}
                    onManipulatingEnd={() => {
                        editor.setCroppingShape(null)
                        editor.setCurrentTool('select.idle')
                    }}
                />
                <DeleteButton shapeId={imageShapeId} />
            </DefaultImageToolbar>
        </>
    )
})

export const CustomVideoToolbar = track(function CustomVideoToolbar() {
    const editor = useEditor()

    const videoShapeId = useValue('videoShape', () => {
        const shape = editor.getOnlySelectedShape()
        if (!shape || shape.type !== 'video') return null
        return shape.id
    }, [editor])

    if (!videoShapeId) return null

    return (
        <>
            <style>{videoStyle}</style>
            <DefaultVideoToolbar>
                <DefaultVideoToolbarContent
                    videoShapeId={videoShapeId}
                    onEditAltTextStart={() => {}}
                />
                <DeleteButton shapeId={videoShapeId} />
            </DefaultVideoToolbar>
        </>
    )
})
