const React = require("react")
const createReactClass = require("create-react-class")
const LiteUploader = require("./lu")

let lu

const LAMBDA_URL = "https://msny951f6i.execute-api.us-east-2.amazonaws.com/default/getSignedUrl"

const Upload = createReactClass({
  displayName: "Upload",

  componentDidMount: function() {
    lu = new LiteUploader({
      url: this.getPreSignedUrl,
      ref: "file",
      method: "PUT",
      rules: {
        allowedFileTypes: "image/jpeg",
      },
      sendAsFormData: false,
      singleFileUploads: true,
    }, this.onEvent)
  },

  getInitialState: function() {
    return {
      uploaderName: "",
      hover: false,
      uploads: null,
      error: null,
    }
  },

  onEvent: function(name, value) {
    console.log(name, value)

    switch (name) {
    case "lu:errors":
      this.setState({error: "You can only upload .jpg images"})
      break
    case "lu:start":
      this.setState({error: null})
      break
    case "lu:before":
      const uploadsOnStart = {}
      uploadsOnStart[value.files[0].name] = "uploading"
      this.setState({uploads: Object.assign({}, this.state.uploads, uploadsOnStart)})
      break
    case "lu:success":
      const uploadsOnSuccess = {}
      uploadsOnSuccess[value.files[0].name] = "complete"
      this.setState({uploads: Object.assign({}, this.state.uploads, uploadsOnSuccess)})
      break
    }
  },

  onInputChange: function(e) {
    this.setState({uploaderName: e.target.value, error: null})
  },

  onDragEnter: function(e) {
    e.preventDefault()
    e.stopPropagation()

    this.setState({hover: true})
  },

  onDragLeave: function(e) {
    e.preventDefault()
    e.stopPropagation()

    this.setState({hover: false})
  },

  getPreSignedUrl: function(files) {
    return new Promise(function(resolve, reject) {
      const  xhr = new XMLHttpRequest()

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText)
            resolve(response.url)
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText,
            })
          }
        }
      }

      xhr.open("GET", LAMBDA_URL + "?fileName=" + files[0].name + "&fileType=" + files[0].type + "&uploaderName=" + this.state.uploaderName)
      xhr.send(null)
    }.bind(this))
  },

  onDrop: function(e) {
    this.onDragLeave(e)
    this.startUpload(e.dataTransfer.files)
  },

  onFileInputChange: function(e) {
    this.startUpload(e.target.files)
  },

  startUpload: function(files) {
    if (!this.state.uploaderName.length) {
      this.setState({error: "Please provide your name"})
      return
    }

    lu.addParam("uploaderName", this.state.uploaderName)
    lu.startUpload(files)
  },

  showProgressRow: function(fileName, state) {
    const icon = (state === "uploading") ? <div className="loader" /> : <div className="checkmark-outer"><div className="checkmark-inner"></div></div>

    return (
      <div key={fileName} className="progress-row">
        <div>{fileName}</div>
        {icon}
      </div>
    )
  },

  resetUpload: function() {
    this.setState({uploads: null})
  },

  showCompletion: function() {
    let uploadTotal = 0
    let completedTotal = 0

    Object.keys(this.state.uploads).forEach(function(key) {
      uploadTotal += 1
      if (this.state.uploads[key] === "complete") completedTotal += 1
    }.bind(this))

    if (uploadTotal !== completedTotal) return null

    return (
      <div className="upload-complete">
        <h3>Complete!</h3>
        <a href="#upload" onClick={this.resetUpload}>Upload more</a>
      </div>
    )
  },

  render: function() {
    const className = (this.state.hover) ? "drop-area hover" : "drop-area"

    return (
      <div>
        <h1>Upload Your Photos</h1>
        <p>If you have taken any photos on the day yourself, we would love to see them! Share them with us using the uploader below.</p>
        <p>You can select multiple files at once</p>
        {this.state.error && <p className="error">{this.state.error}</p>}
        {!this.state.uploads && <div>
          <input value={this.state.uploaderName} onChange={this.onInputChange} placeholder="Add your name here" />
          <input type="file" key={this.state.error} onChange={this.onFileInputChange} multiple disabled={!this.state.uploaderName.length} />
          <div className={className} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onDragOver={this.onDragEnter} onDrop={this.onDrop}>
            <div>
              <h3>Or drag and drop your images here</h3>
            </div>
          </div>
        </div>}
        {this.state.uploads && <div>
          {Object.keys(this.state.uploads).map(function(key) {
            return this.showProgressRow(key, this.state.uploads[key])
          }.bind(this))}
          {this.showCompletion()}
        </div>}
      </div>
    )
  },
})

module.exports = Upload
