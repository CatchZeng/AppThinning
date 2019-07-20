class AppthinningError extends Error {
    constructor(code, message) {
      super(message)
      this.code = code
    }
}

class ProjectParamError extends AppthinningError {
  constructor() {
    super(1, "Project directory parameter not specified.") 
  }
}

class ProjectNotExistError extends AppthinningError {
  constructor() {
    super(2, "Project directory does not exist.") 
  }
}

class IgnoreError extends AppthinningError {
  constructor(err) {
    super(3, err.message) 
  }
}

class SvgoError extends AppthinningError {
  constructor(err) {
    super(4, err.message) 
  }
}

class TinyPngError extends AppthinningError {
  constructor(err) {
    super(5, err.message) 
  }
}

class TinyPngValidateError extends AppthinningError {
  constructor() {
    super(6, "tinyPng validate error. Please check tinyPng's key, you can get it from https://tinypng.com/developers")
  }
}

class ImageOptimError extends AppthinningError {
  constructor(err) {
    super(7, err.message) 
  }
}

module.exports = {
  AppthinningError,
  ProjectParamError,
  ProjectNotExistError,
  IgnoreError,
  SvgoError,
  TinyPngError,
  TinyPngValidateError,
  ImageOptimError
}