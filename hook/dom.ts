import { useEffect } from 'react'

type eventListenerProps = {
    name: string
    callback: (e: Event) => void
}

const useEventListener = (
    { name, callback }: eventListenerProps,
    dependencies: any[] | null = null
) => {
    if (dependencies === null) {
        dependencies = []
    }

    useEffect(() => {
        const cb = callback

        document.addEventListener(name, cb)

        return () => document.removeEventListener(name, cb)
    }, [callback, name, ...dependencies])
}

type ClickedOutSideProps = {
    reference: any
    callback: any
}

const useClickedOutSide = (
    { reference, callback }: ClickedOutSideProps,
    dependencies: any[] | null = null
) => {
    if (dependencies === null) {
        dependencies = []
    }

    const cb = (e: Event) => {
        if (reference.current && !reference.current.contains(e.target))
            callback()
    }

    useEventListener({ name: 'click', callback: cb }, dependencies)
}

export { useEventListener, useClickedOutSide }
