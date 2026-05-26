import { Tldraw, track, TldrawProps } from 'tldraw'
import { PromptBoxComponent } from './components/PromptBox'
import { CustomImageToolbar, CustomVideoToolbar } from './components/CustomMediaToolbar'
import styles from './styles/App.module.css'

const assetUrls: TldrawProps['assetUrls'] = {
	icons: {
		'arrow-up': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDE5VjVNMTIgNUw1IDEyTTEyIDVMMTkgMTIiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==',
	},
}

const Canvas = track(() => {
    return <PromptBoxComponent />
})

function App() {
    return (
        <div className={styles.container}>
            <Tldraw
                persistenceKey='local'
                assetUrls={assetUrls}
                components={{
                    InFrontOfTheCanvas: Canvas,
                    StylePanel: null,
                    ImageToolbar: CustomImageToolbar,
                    VideoToolbar: CustomVideoToolbar,
                }}
            />
        </div>
    )
}

export default App