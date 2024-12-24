
export const getImage = (images) => {
    if (!images) {
        return;
    }
    images = (images.toString().split("$$"));
    return images[0];
};