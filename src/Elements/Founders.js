import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Carousel,
} from "@material-tailwind/react";

export default function Founders() {
    return (
        <div>
            <Carousel
                className="rounded-xl"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                <Card
                    shadow={false}
                    className="relative grid h-[40rem] w-full max-w-[80rem] items-end justify-center overflow-hidden text-center m-9"
                >
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                    >
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative py-14 px-6 md:px-12">
                        <Typography
                            variant="h2"
                            color="white"
                            className="mb-6 font-medium leading-[1.5]"
                        >
                            The founders of the ComptaEasy
                        </Typography>
                        <Typography variant="h5" className="mb-4 text-gray-400">
                            Amine Lehkim
                        </Typography>
                        <Avatar
                            size="xl"
                            variant="circular"
                            alt="tania andrew"
                            className="border-2 border-white no-blur"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        />
                    </CardBody>
                </Card>
                <Card
                    shadow={false}
                    className="relative grid h-[40rem] w-full max-w-[80rem] items-end justify-center overflow-hidden text-center m-9"
                >
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                    >
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative py-14 px-6 md:px-12">
                        <Typography
                            variant="h2"
                            color="white"
                            className="mb-6 font-medium leading-[1.5]"
                        >
                            The founders of the ComptaEasy
                        </Typography>
                        <Typography variant="h5" className="mb-4 text-gray-400">
                            Ali Houcne
                        </Typography>
                        <Avatar
                            size="xl"
                            variant="circular"
                            alt="tania andrew"
                            className="border-2 border-white no-blur"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        />
                    </CardBody>
                </Card>
            </Carousel>
        </div>
    )
}