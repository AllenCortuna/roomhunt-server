

export const getAccommodators = async (req, res) => { 
    try {
        const userModal = await AccommodatorModal.find()
        console.log('getuser ok');
        res.status(200).json(userModal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getAccommodator = async (req, res) => { 
    try {
        const userModal = await AccommodatorModal.findOne()
        console.log('getuser ok');
        res.status(200).json(userModal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

