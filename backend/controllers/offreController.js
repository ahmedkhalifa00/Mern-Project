const asyncHandler =require('express-async-handler')

// @desc    Get offres
// @route   GET /api/offres
// @access  Private
const getOffres =asyncHandler(async(req,res) => {
    res.status(200).json({message:'Get Offres'})
})
  
// @desc    Set offre
// @route   POST /api/offres
// @access  Private
const setOffre =asyncHandler(async(req,res) => {
  //if (!req.body.text){
    //res.status(400)
    //throw new Error('please add a text field')
  //}
  res.status(200).json({ message: 'Set offre'})
})
  
// @desc    Update offre
// @route   PUT /api/offres/:id
// @access  Private
const updateOffre =asyncHandler(async(req,res) => {
  res.status(200).json({ message: `Update offre ${req.params.id}` })
})
  
// @desc    Delete offre
// @route   DELETE /api/offres/:id
// @access  Private
const deleteOffre =asyncHandler(async(req,res) => {
  res.status(200).json({ message: `Delete offre ${req.params.id}` })
})
  
module.exports = {
    getOffres,
    setOffre,
    updateOffre,
    deleteOffre,
  }