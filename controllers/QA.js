const QA = require('../models/QA');
const {  validateRegister, validateLogin, validateResetPassword, createAgentValidator } = require('../middleware/Input-validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET } = require('../config/server');
const PasswordResetMailSender = require('../config/mail');
const AgentEmailSender = require('../config/mail');
const AGENT = require('../models/Agent');
exports.Register = async (req, res) =>
{
    const QA_MODEL = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    
    try
    {
        const { error, value } = validateRegister(QA_MODEL);

        if (error)
        {
            return res.status(400).json({ message: error.details});
        }
        const user = await QA.findOne({ where: { email: value.email } });
        if (user)
        {
            return res.status(422).json({message: "QA already exists"});
        }
       
       const hashedPassword = await bcrypt.hash(QA_MODEL.password, 12);
        const new_user = await QA.create({
            name: QA_MODEL.name,
            email: QA_MODEL.email,
            password: hashedPassword
        });
        await new_user.save();
        
        // return res.status(201).json({ message: "QA created successfully" });
        return res.status(201).json(new_user);
    }
    catch (err)
    {
   
        return res.status(403).json({ message: "You are not Authorized" });
    }
}

exports.Login = async (req, res) =>
{
    const QA_MODEL = {
        email: req.body.email,
        password: req.body.password
    }
    
    try {
       
        const { error, value } = validateLogin(QA_MODEL);
        if(error)
        {
            return res.status(400).json({ message: error.details});
        }
       
        const user = await QA.findOne({ where: { email: value.email } });
        if (!user)
        {
           return res.status(401).json({ message: "QA does not exist" });
        }
        const isEqual = await bcrypt.compare(value.password, user.password);
        if (!isEqual)
        {
            return res.status(401).json({message: "Password is incorrect"});
        }
        //Generate token
   
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
   
        return res.status(200).json({ token: token, userId: user.id, message: "QA logged in successfully" });

    } catch (error)
    {
        return res.status(403).json({ message: "You are not Authorized" });
    }
}

exports.ResetPassword = async (req, res) =>
{
    try
    {
        const { error, value } = validateResetPassword(req.body);
        if (error)
        {
            return res.status(400).json({ message: error.details});
        }
        const user = await QA.findOne({ where: { email: value.email } });
        if (!user)
        {
            return res.status(401).json({message: "There is no QA with this email"});
        }
        const {email, name} = user;
        // await request(email, password);
        await PasswordResetMailSender(email)
        return res.status(200).json({ message: "Reset password link sent to your email" });

    } catch (error)
    {
        console.log(error);
        return res.status(403).json({ message: "You are not Authorized" });
    }
}

exports.createAgent = async (req, res) =>
{
   
    try
    {
        
        const password = require('../utils/passwordGenerator');
        const AGENT_MODEL = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
            role: req.body.role,
        }
        const { error, value } = createAgentValidator(AGENT_MODEL);
        
        if (error)
        {
            return res.status(400).json({ message: error.details});
        }
        const agent = await AGENT.findOne({ where: { email: value.email } });
        if (agent)
        {
            return res.status(422).json({ message: "Agent already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const {firstname, lastname, email, role} = AGENT_MODEL;
        const new_agent = await AGENT.create({
            firstname,
            lastname,
            email,
            password : hashedPassword,
            role
        });
        await new_agent.save();
        await AgentEmailSender(firstname ,email, password);
        return res.status(201).json({ message: "Agent created successfully" });
   } catch (error)
    {
        console.log(error)
       return res.status(403).json({ message: "You are not Authorized" });
   }
}

exports.getAllAgents = async (req, res) =>
{
    try
    {
        const agents = await AGENT.findAll();
        return res.status(200).json(agents);
    } catch (error)
    {
        return res.status(403).json({ message: "You are not Authorized" });
    }
}

exports.getAgent = async (req, res) =>
{
    const agentId = req.body.id;
    try
    {
        const agent = await AGENT.findOne({ where: { id: agentId } });
        if (!agent)
        {
            return res.status(404).json({ message: "Agent not found" });
        }
        return res.status(200).json(agent);
    } catch (error)
    {
        console.log(error)
        return res.status(403).json({ message: "You are not Authorized" });
    }
}