import { useForm } from "react-hook-form";

interface IForm{
    email:string,
    firstName:string,
    lastName:string,
    username:string,
    password:string,
    password1:string,
    extraError?:string,
}

function ToDoList() {
    const { register, 
            handleSubmit, 
            formState: { errors },
            setError, 
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });
    const onValid = (data: any) => {
        if(data.password !== data.password1){
            setError(
                "password",
                { message: "동일한 패스워드가 아닙니다."},
                {shouldFocus: true},
            );
        }
    };
    
    console.log(errors);
    return (
        <div>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
                <input {...register("email", { 
                                                required: "이메일은 필수 값 입니다.",
                                                pattern: {
                                                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                                                    message: "네이버 메일만 사용 가능합니다.",
                                                }, 
                                             })} 
                                            placeholder="Email" />
                <span>{errors?.email?.message}</span>
                <input 
                    {...register("firstName", {
                         required: "필수 입력 입니다.",
                         validate: {
                             noNico: value => value.includes("nico") ? "니코 사용불가!" : true,
                             noNick: value => value.includes("nick") ? "닉 사용불가!" : true,
                         },
                        })} 
                    placeholder="First Name" />
                <span>{errors?.firstName?.message}</span>
                <input {...register("lastName", { required: "필수 입력 입니다." })} placeholder="Last Name" />
                <span>{errors?.lastName?.message}</span>
                <input {...register("username", { required: "필수 입력 입니다.", minLength: 10 })} placeholder="Username" />
                <span>{errors?.username?.message}</span>
                <input {...register("password", { required: "필수 입력 입니다.", minLength: 5 })} placeholder="Password" />
                <span>{errors?.password?.message}</span>
                <input {...register("password1", { required: "필수 입력 입니다.", minLength: 5 })} placeholder="Password1" />
                <span>{errors?.password1?.message}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );
}

export default ToDoList;