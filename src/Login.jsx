import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import logo from './assets/logo.png'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./components/ui/form"
import { Input } from "./components/ui/input"
import { Button } from './components/ui/button';
import { SelectSeparator } from './components/ui/select';
import LogIn from './assets/LogIn.svg';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message:"Password should be minimum 8 letters"}).max(100),
  })

const Login = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })

    async function onSubmit(values) {
        console.log(values)
        await signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/dashboard")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

    }

    async function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
            navigate("/dashboard"); // Redirect to dashboard or appropriate page after successful sign-in
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    }

  return (
    <div className='grid grid-cols-[40%,60%] h-screen'>
        <div className='flex flex-col flex-1'>
            <img src={logo} alt='logo' className='aspect-video h-20 mr-auto'/>
            <div className='flex flex-col justify-center align-middle m-auto'>
                <p className='text-4xl font-bold'>Sign in</p>
                <p className='text-lg font-normal text-secondary mb-10'>Please login to continue to your account</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full">Sign in</Button>
                    </form>
                </Form>
                <div className='my-5 flex gap-2'>
                    <SelectSeparator className="flex-1 my-auto" /> or <SelectSeparator className="flex-1 my-auto" />
                </div>
                <div className="">
                    <Button onClick={handleGoogleSignIn} className="w-full">Sign in with Google</Button>
                </div>
                <div className='mt-4'>
                    <p>Need an account? <NavLink to="/signup" className='text-primary'>Create One</NavLink></p>
                </div>
            </div>
        </div>
        <div className='bg-[#ff847c] flex-1 flex flex-col m-4 rounded-xl'>
            <div className='m-auto'>
                <img src={LogIn} alt='signup' className='' />
                <p className='font-bold text-xl text-white text-center mt-10'>Track and boost your engagement</p>
                <p className='font-normal text-base text-white text-center mt-4'>Unlock your social media potential with AI-powered </p>
                <p className='font-normal text-base text-white text-center'> engagement insights and personalized recommendations for</p>
                <p className='font-normal text-base text-white text-center'> growth </p>
            </div>
        </div>
    </div>
  )
}

export default Login