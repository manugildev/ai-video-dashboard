import { TldrawUiButton, TldrawUiButtonIcon, track, useEditor } from 'tldraw'
import { useState } from 'react'
import styles from '../styles/App.module.css'

export const PromptBoxComponent = track(() => {
    const editor = useEditor()
    const [input, setInput] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const selectedShapes = editor.getSelectedShapes()

    const handleSubmit = async () => {
        if (!input.trim()) return
        setIsSubmitting(true)
        try {
            console.log('Prompt:', input)

            for (const shape of selectedShapes) {
                if ((shape?.type === 'image' || shape?.type === 'video') && shape.props.assetId) {
                    const asset = editor.getAsset(shape.props.assetId)

                    if (asset) {
                        const assetBlobUrl = await editor.resolveAssetUrl(asset.id, {})
                        console.log('Resolved asset URL:', assetBlobUrl)
                        if (assetBlobUrl) {
                            const response = await fetch(assetBlobUrl)
                            const blob = await response.blob()
                            console.log('Blob:', blob)
                        }
                    }
                }
            }
        } finally {
            setIsSubmitting(false)
            setInput('')
        }
    }

    return (
        <div className={styles.promptBox} data-debug={editor.getInstanceState().isDebugMode} onPointerDown={editor.markEventAsHandled}>
            <div
                className={styles.form}
                onKeyDownCapture={(e) => {
                    // Submit on Enter (but allow Shift+Enter to fall through to the textarea)
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit()
                    }
                }}
            >
                <textarea
                    className={styles.textarea}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What do you want to create?"
                    disabled={isSubmitting}
                    rows={Math.max(1, input.split('\n').length)}
                />

                <TldrawUiButton
                    type="normal"
					className={styles.sendButton}
                    disabled={!input.trim() || isSubmitting}
                    onClick={handleSubmit}
                    title="Send"
                >
                    <TldrawUiButtonIcon icon={isSubmitting ? 'spinner' : 'arrow-up'} />
                </TldrawUiButton>
            </div>
        </div>
    )
})
