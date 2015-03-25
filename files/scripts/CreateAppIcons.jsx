﻿/*      */var icons = [        { name: 'appicon-76@2x.png', size: 152 },    { name: 'appicon.png', size: 57 },        { name: 'appicon@2x.png', size: 114 },    { name: 'appicon-Small.png', size: 29 },    { name: 'appicon-Small@2x.png', size: 57 },    { name: 'appicon-Small-50.png', size: 50 },    { name: 'appicon-Small-50@2x.png', size: 100 },    { name: 'appicon-60@2x.png', size: 120 },    { name: 'appicon-72.png', size: 72 },    { name: 'appicon-72@2x.png', size: 144 },    { name: 'appicon-76.png', size: 76 },/*    { name: 'appicon.png', size: 36, folder:'drawable-ldpi' },    { name: 'appicon.png', size: 48, folder:'drawable-mdpi' },    { name: 'appicon.png', size: 72, folder:'drawable-hdpi'},    { name: 'appicon.png', size: 96, folder:'drawable-xhdpi' },    { name: 'appicon.png', size: 144, folder:'drawable-xxhdpi' }    */];function main() {    var png = app.activeDocument;    if (png.height != png.width) {        alert('You must have an image with an equal height and width.');        return;    }    if (png.height < 152 || png.width < 152) {        alert('Your image must be greater than 151x151.');        return;    }    var pngPath = null;    if (png.path) {        pngPath = png.path;    } else {        pngPath = "/";    }	    var startRulerUnits = app.preferences.rulerUnits;    app.preferences.rulerUnits = Units.PIXELS;	    for (var a = 0; a < icons.length; a++) {            var icon = icons[a];            png.resizeImage(icon.size, icon.size);            // android            if (icon.folder) {                var folderPath = pngPath+"/res/"+ icon.folder;                var folder = Folder(folderPath);                if (!folder.exists) {                    folder.create();                }                icon.name = folderPath + "/"+ icon.name            } else {                 icon.name =  pngPath + "/" + icon.name            }            savePNG(png,icon.name);            // undo the state change            png.activeHistoryState = png.historyStates[png.historyStates.length-2];    }	app.preferences.rulerUnits = startRulerUnits;	// png.close(SaveOptions.DONOTSAVECHANGES);}function savePNG(psd, pathAndName)  {	var pngOptions = new ExportOptionsSaveForWeb;	pngOptions.PNG8 = false;	pngOptions.transparency = true;	pngOptions.format = SaveDocumentType.PNG;	pngOptions.interlaced = false;	pngOptions.quality = 100;	pngOptions.optimized = true;	psd.exportDocument(new File(pathAndName), ExportType.SAVEFORWEB, pngOptions);}main();