FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
)
// parse all file inputs into file pond objects
FilePond.parse(document.body);