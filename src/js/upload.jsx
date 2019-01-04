const React = require("react")
const createReactClass = require("create-react-class")
const bluebird = require("bluebird")

const LAMBDA_URL = "https://msny951f6i.execute-api.us-east-2.amazonaws.com/default/getSignedUrl"

const Upload = createReactClass({
  displayName: "Upload",

  getInitialState: function() {
    return {
      uploaderName: "",
      hover: false,
      uploads: null,
      error: null,
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

  getPreSignedUrl: function(file) {
    return fetch(`${LAMBDA_URL}?fileName=${file.name}&fileType=${file.type}&uploaderName=${this.state.uploaderName}`, {method: "get"})
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        return response.json()
      })
      .then(function(res) {
        return res.url
      })
  },

  findInvalidFiles: function(files) {
    return Array.prototype.filter.call(files, function(file) {
      return file.type !== "image/jpeg"
    })
  },

  uploadFile: function(file) {
    return this.getPreSignedUrl(file)
      .then(function(url) {
        return new Promise(function(resolve, reject) {
          const xhr = new XMLHttpRequest()

          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                const toUpdate = this.state.uploads
                toUpdate[file.name] = "complete"
                this.setState({uploads: toUpdate})
                resolve({})
              } else {
                reject({
                  status: xhr.status,
                  statusText: xhr.statusText,
                })
              }
            }
          }.bind(this)

          xhr.open("PUT", url)
          xhr.send(file)
        }.bind(this))
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
      this.setState({error: "Please provide an author name"})
      return
    }

    const invalidFiles = this.findInvalidFiles(files)

    if (invalidFiles.length) {
      this.setState({error: "You can only upload .jpg images"})
      return
    }

    const toUpdate = {}
    Array.prototype.forEach.call(files, function(file) {
      toUpdate[file.name] = "uploading"
    })

    this.setState({uploads: toUpdate, error: null})

    bluebird.map(files, function(file) {
      return this.uploadFile(file)
    }.bind(this), {concurrency: 1})
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

  render: function() {
    const className = (this.state.hover) ? "drop-area hover" : "drop-area"

    return (
      <div>
        <h1>Upload Your Photos</h1>
        <p>If you have taken any photos on the day yourself, we would love to see them. Share them with us using the uploader below.</p>
        {this.state.error && <p className="error">{this.state.error}</p>}
        {!this.state.uploads && <div>
          <input value={this.state.uploaderName} onChange={this.onInputChange} placeholder="Add your name here" />
          <input type="file" key={this.state.error} onChange={this.onFileInputChange} multiple />
          <div className={className} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onDragOver={this.onDragEnter} onDrop={this.onDrop}>
            <div>
              <h3>Or Drag and drop your images here</h3>
            </div>
          </div>
        </div>}
        {this.state.uploads && <div>
          {Object.keys(this.state.uploads).map(function(key) {
            return this.showProgressRow(key, this.state.uploads[key])
          }.bind(this))}
        </div>}
      </div>
    )
  },
})

module.exports = Upload
