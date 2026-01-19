import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Checkbox } from "@/app/components/ui/checkbox";
import { UserCircle, Briefcase } from "lucide-react";

export function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"client" | "professional">("client");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl text-primary mb-2">ServiçoPRO</h1>
              <p className="text-xl text-muted-foreground">
                Conectamos você aos melhores profissionais de serviços residenciais
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base mb-1">Profissionais Verificados</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos os prestadores passam por rigorosa verificação
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base mb-1">Pagamento Seguro</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistema Escrow protege seu dinheiro até a conclusão
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base mb-1">Avaliações Reais</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistema transparente de avaliações de clientes
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <img 
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600"
                alt="Profissional trabalhando"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl mb-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin 
                ? 'Entre com suas credenciais para acessar sua conta' 
                : 'Preencha os dados abaixo para começar'
              }
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setUserType("client")}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${userType === "client" 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <UserCircle className={`w-8 h-8 mx-auto mb-2 ${userType === "client" ? 'text-primary' : 'text-gray-400'}`} />
              <p className="text-sm">Sou Cliente</p>
            </button>
            
            <button
              onClick={() => setUserType("professional")}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${userType === "professional" 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <Briefcase className={`w-8 h-8 mx-auto mb-2 ${userType === "professional" ? 'text-primary' : 'text-gray-400'}`} />
              <p className="text-sm">Sou Profissional</p>
            </button>
          </div>

          <Tabs value={isLogin ? "login" : "register"} onValueChange={(v) => setIsLogin(v === "login")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm cursor-pointer"
                    >
                      Lembrar de mim
                    </label>
                  </div>
                  
                  <a href="#" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                
                <Button 
                  type="button"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={onLogin}
                >
                  Entrar
                </Button>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">ou continue com</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button type="button" variant="outline">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="reg-name">Nome Completo</Label>
                  <Input 
                    id="reg-name"
                    placeholder="Seu nome"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-email">E-mail</Label>
                  <Input 
                    id="reg-email"
                    type="email"
                    placeholder="seu@email.com"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-phone">Telefone</Label>
                  <Input 
                    id="reg-phone"
                    placeholder="(00) 00000-0000"
                    className="mt-1"
                  />
                </div>
                
                {userType === "professional" && (
                  <div>
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Input 
                      id="specialty"
                      placeholder="Ex: Pedreiro, Eletricista..."
                      className="mt-1"
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="reg-password">Senha</Label>
                  <Input 
                    id="reg-password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-confirm">Confirmar Senha</Label>
                  <Input 
                    id="reg-confirm"
                    type="password"
                    placeholder="Digite a senha novamente"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" />
                  <label
                    htmlFor="terms"
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    Aceito os termos de uso e política de privacidade
                  </label>
                </div>
                
                <Button 
                  type="button"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={onLogin}
                >
                  Criar Conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
