/*jshint esversion: 9 */

/** @type {import('next').NextConfig} */
const { join, basename, dirname, extname } = require('path');
const { version } = require('./package.json');

const generateVersionHash = (value) =>
  Array.from(value).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  );

const getFilename = (originalPath, buildId, chunk = '') => {
  const filename = basename(originalPath);
  const directoryName = dirname(originalPath);
  const path = directoryName === '.' ? '' : directoryName;
  const extension = extname(originalPath);

  return join(
    path,
    `${filename.replace(extension, '')}${
      chunk.length ? `-[${chunk}]` : ''
    }.${buildId}${extension}`
  );
};

const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () =>
    `${generateVersionHash(`${process.env.NEXT_PUBLIC_VERSION || version}`)}`,
  webpack: (config, { buildId }) => ({
    ...config,
    output: {
      ...config.output,
      filename: getFilename(config.output.filename, buildId),
      chunkFilename: getFilename(
        config.output.chunkFilename,
        buildId,
        'chunkhash'
      ),
    },
  }),
};

module.exports = nextConfig;
