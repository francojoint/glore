import { type Config } from 'release-it'

export default {
  hooks: {
    'after:init': 'pnpm run lint',
    'after:release': 'echo Successfully released ${name}@${version}.',
  },
  git: {
    push: true,
    commitMessage: 'chore: release v${version}',
    tagName: 'v${version}',
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    autoGenerate: true,
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/bumper': {
      out: {
        file: 'package.json',
        path: 'version',
      },
    },
    '@release-it/conventional-changelog': {
      preset: {
        name: 'conventionalcommits',
      },
      header: '# Changelog',
      infile: 'CHANGELOG.md',
    },
    'release-it-pnpm': {},
  },
} satisfies Config
