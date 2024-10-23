import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { loginEmpleado } from '../api';

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setError(""); // Limpiar errores anteriores al enviar el formulario
    
        if (!email || !password) {
            setError("Por favor, rellena todos los campos");
            return;
        }
    
        try {
            const response = await loginEmpleado(email, password);
            console.log(response);
            if (response.success) {
                const role = response.rol; // Obtener el rol del empleado desde la respuesta
                const code = response.cod_empleado; // Obtener el código del empleado desde la respuesta

                // Guardar la información en localStorage
                localStorage.setItem('code', JSON.stringify(code));

                // Redirigir al usuario dependiendo del rol
                if (role === 'Administrador') {
                    window.location.href = '/dashboard';
                } else if (role === 'Empleado') {
                    window.location.href = '/empleado';
                } else {
                    setError('Rol no autorizado');
                }
                
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error: any) {
            setError(error.message || 'Error en la solicitud');
        }
    };

    return (

        // Contenedor principal 
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            
            {/* Tarjeta para el formulario de inicio de sesión */}
            <Card className="w-full max-w-[450px] bg-gray-800 text-gray-100 shadow-xl">
                
                {/* Encabezado de la tarjeta */}
                <CardHeader className="space-y-2"> {/*  space-y-2 es para agregar un espacion entre el titulo y la descripcion */}
                    
                    {/* Título y descripción de la tarjeta */}
                    <CardTitle className="text-3xl font-bold text-white text-center">Iniciar sesión</CardTitle>
                    <CardDescription className="text-gray-400 text-center text-lg">
                        Ingresa tus credenciales para acceder a tu cuenta.
                    </CardDescription>

                </CardHeader>

                {/* Contenido principal de la tarjeta */}
                <CardContent className="space-y-6"> {/*  space-y-6 es para agregar un espacion entre los elementos del formulario */}
                   
                    {/* Formulario que maneja el envío de los datos con la función `handleSubmit` definida arriba */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="space-y-4"> {/* Contenedor para los campos de correo y contraseña, con espacio entre ellos. */}

                            {/* Campo de correo */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-200 text-lg">Correo electrónico</Label>
                                <Input 
                                id="email" 
                                type="email" 
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 h-12 text-lg"
                                />
                            </div> {/*`onChange` actualiza el estado cuando el usuario escribe algo en el campo*/}
                            
                            {/* Campo de contraseña */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-200 text-lg">Contraseña</Label>
                                <Input 
                                id="password" 
                                type="password" 
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 h-12 text-lg"
                                />
                            </div> {/*Todo igual que el campo de correo*/}
                            
                        </div>
                        
                        {/*Si hay un mensaje de error (`error`), se muestra una alerta de error*/}
                        {error && (
                        <Alert variant="destructive" className="bg-red-900 border-red-600 text-red-100">
                            <AlertDescription className="text-lg">{error}</AlertDescription>
                        </Alert>
                        )} {/*El mensaje de error se obtiene del estado `error`*/}

                        {/*Botón para enviar el formulario*/}
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                            Iniciar sesión
                        </Button> 

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}