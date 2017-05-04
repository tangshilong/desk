const {
	app
} = require("electron");
const {
	BrowserWindow
} = require("electron");
let win;
/**
 * singletask
 */
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
	// Someone tried to run a second instance, we should focus our window.
	var winarry = BrowserWindow.getAllWindows();
	var win = winarry.length > 0 ? winarry[0] : undefined;
	if(win) {
		if(win.isMinimized()) win.restore()
		win.focus()
	}
})
if(shouldQuit) {
	app.quit()
}
/**
 * 远程判断版本号是否是最新的，如果是最新的，直接进入login.html,否则更新下载之后在进入login.html
 */
function startApp() {
	win = new BrowserWindow({
		title: "test",
		frame: true,
		autoHideMenuBar: true,
		show: false,
		width: 700,
		height: 800,
		center: true,
		transparent: true,
		maximizable: false,
		resizable: false
	});
	win.on("closed", () => {
		win == null;
	});
	win.loadURL(`file://${__dirname}/html/index.html`);
	win.once('ready-to-show', () => {
		win.show();
	})
}

app.on("ready", startApp);

app.on('window-all-closed', () => {
	app.quit();
});