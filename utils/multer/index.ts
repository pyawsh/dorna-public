import path from 'path'

export const buildDir = (): string => {
    let currentPath = __dirname
    while (path.basename(currentPath) !== '.next') {
        currentPath = path.join(currentPath, '..')
    }

    return currentPath
}
