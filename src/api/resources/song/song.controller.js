import Joi from 'joi';
import Song from './song.model'
export default {
    async create(req, res) {
        try{
        console.log(req.body);
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            url: Joi.string().required(),
            rating: Joi.number()
                .integer()
                .min(0)
                .max(5)
                .optional(),
        });
        const { value, error } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        const song = await Song.create(value)
       // return res.json(value);
       return res.json(song)
    }  catch(error){
        console.log(error)
        return res.status(500).send(error)
    } 
    },
    async findAll(req, res) {
        try {
            const { page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit : parseInt(perPage , 10) || 10
            }
            const songs = await Song.paginate({}, options)
          //  const songs = await Song.find();
            return res.json(songs);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async findOne(req, res) {
        try {
            const { id } = req.params
            const songs = await Song.findById(id)
            if (!songs){
                return res.status(404).json({ error : 'could not find song'})
            }
            return res.json(songs);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    async delete (req,res) {
        try {
            const { id } = req.params
            const songs = await Song.findOneAndRemove({ _id : id})
            if (!songs) {
                return res.status(404).json({ error: 'could not find song' })
            }
            return res.json(songs);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    async update(req, res) {
    try {
      const { id } = req.params;
      const schema = Joi.object().keys({
        title: Joi.string().optional(),
        url: Joi.string().optional(),
        rating: Joi.number()
          .integer()
          .min(0)
          .max(5)
          .optional(),
      });
      const { value, error } = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const song = await Song.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!song) {
        return res.status(404).json({ err: 'could not find song' });
      }
      return res.json(song);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
};