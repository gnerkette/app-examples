///<reference path="rtb.helpers.d.ts" />

interface IWidgetCommands {
	getAll():Promise<SDKWidgetInfo[]>
	getById(widgetId:string):Promise<SDKWidgetInfo|undefined>
	create(data:any):Promise<SDKWidgetInfo>
	updateById(widgetId:string, data:any):Promise<SDKWidgetInfo>
	deleteById(widgetId:string):Promise<void>
}

interface ILinksCommands {
	getAll():Promise<SDKLinkInfo[]>
	getById(linkId:string):Promise<SDKLinkInfo|undefined>
	connectWidgets(widgetAId:string, widgetBId:string, data:any):Promise<SDKLinkInfo>
	updateById(linkId:string, data:any):Promise<SDKLinkInfo>
	deleteById(linkId:string):Promise<void>
}

interface IBoardCommands {
	widgets:IWidgetCommands
	links:ILinksCommands

	// iframe extension points
	openLeftSidebar(iframeURL:string):Promise<void>
	openRightSidebar(iframeURL:string):Promise<void>
	openLibrary(title:string, iframeURL:string):Promise<void>
	openModal(iframeURL:string):Promise<void>

	// get basic board info
	getInfo():Promise<SDKBoardInfo>

	setZoom(value:number)
	getZoom():Promise<number>

	// set HAND or CURSOR tool, depends on  EDIT_RIGHTS
	selectDefaultTool():Promise<void>

	// get current canvas viewport
	getViewport():Promise<IRect>

	// set canvas viewport
	setViewport(viewport:IRect):Promise<IRect>
	setViewportWithAnimation(viewport:IRect):Promise<IRect>
	zoomInToWidget(widgetId:string, selectWidget?:boolean):void

	// get selected widget id after user selects it
	enterSelectWidgetMode():Promise<{widgetId:string}>

	// utils methods to edit frames 
	getFrameChildren(frameId:string):Promise<SDKWidgetInfo[]>
	setFrameChildren(frameId:string, widgetIds:string[]):Promise<void>

	// drop images to board
	// for iframe extension point only
	draggableImagePressed(options:DraggableImageOptions):Promise<SDKWidgetInfo|undefined>
}

interface IPluginConfig {
	onStart?:() => void,
	onStop?:() => void,
	extensionPoints?:{
		upload?:{
			title:string,
			svgIcon:string,
			onClick:() => void
		},
		toolbar?:{
			title:string,
			toolbarSvgIcon:string,
			librarySvgIcon:string,
			onClick:() => void
		},
		bottomBar?:{
			title:string,
			svgIcon:string,
			positionPriority:number,
			onClick:() => void,
			getNotification?:() => any // Если обработчик есть, то он опрашивается приложением раз в секунду
		},
		exportMenu?:{
			title:string,
			svgIcon:string,
			onClick:() => void
		}
		widgetContextMenu?:{
			widgetTypes:[string],
			tooltip:string,
			onClick:(widgetId:string) => void
		},
		canvasContextMenu?:{
			title:string,
			onClick:() => void
		}
	}
}

interface SDKHelpers {
	initScrollableContainerWithDraggableImages(container:Element, options:{
		imageItemClassSelector:string
	}):HTMLElement
}

interface RtbSDK {
	// for sandbox only
	initialize(config:IPluginConfig)

	// for iframe extension point only
	onReady(callback:() => any)

	//common
	board:IBoardCommands

	addListener(event:string, listener:(e) => void)
	removeListener(event:string, listener:(e) => void)

	showNotification(text:string)
	showErrorNotification(text:string)

	helpers:SDKHelpers
}

declare const rtb:RtbSDK