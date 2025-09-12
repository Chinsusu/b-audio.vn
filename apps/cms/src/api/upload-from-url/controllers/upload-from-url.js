'use strict';

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');

const streamPipeline = promisify(pipeline);

module.exports = {
  async uploadFromUrl(ctx) {
    try {
      const { url } = ctx.request.body;

      if (!url) {
        return ctx.badRequest('URL is required');
      }

      // Validate URL
      let parsedUrl;
      try {
        parsedUrl = new URL(url);
      } catch (error) {
        return ctx.badRequest('Invalid URL format');
      }

      // Fetch the file from URL
      const response = await fetch(url);
      
      if (!response.ok) {
        return ctx.badRequest(`Failed to fetch from URL: ${response.statusText}`);
      }

      // Get content type and determine file extension
      const contentType = response.headers.get('content-type');
      const fileExtension = this.getExtensionFromContentType(contentType) || '.jpg';
      
      // Generate filename from URL or use default
      const urlPath = parsedUrl.pathname;
      const originalName = path.basename(urlPath) || `downloaded-image-${Date.now()}`;
      const filename = originalName.includes('.') ? originalName : `${originalName}${fileExtension}`;

      // Create temporary file
      const tmpDir = '/tmp';
      const tempFilePath = path.join(tmpDir, `upload-${Date.now()}-${filename}`);

      // Download file to temporary location
      await streamPipeline(response.body, fs.createWriteStream(tempFilePath));

      // Get file stats
      const stats = fs.statSync(tempFilePath);

      // Create file object for Strapi upload
      const fileObj = {
        path: tempFilePath,
        name: filename,
        type: contentType || 'image/jpeg',
        size: stats.size,
      };

      // Upload to Strapi using upload service
      const uploadService = strapi.plugin('upload').service('upload');
      const uploadedFiles = await uploadService.upload({
        data: {},
        files: fileObj,
      });

      // Clean up temporary file
      fs.unlinkSync(tempFilePath);

      ctx.body = uploadedFiles[0];
    } catch (error) {
      console.error('Upload from URL error:', error);
      ctx.internalServerError('Failed to upload from URL');
    }
  },

  getExtensionFromContentType(contentType) {
    const mimeToExt = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'image/svg+xml': '.svg',
      'image/bmp': '.bmp',
    };
    return mimeToExt[contentType];
  },
};
