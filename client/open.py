import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

GPIO.setup(22,GPIO.OUT)
servo1 = GPIO.PWM(22,50)

servo1.start(0)
time.sleep(2)

servo1.ChangeDutyCycle(6)
time.sleep(0.3)
servo1.ChangeDutyCycle(0)

time.sleep(0.25)

servo1.ChangeDutyCycle(2)
time.sleep(0.5)
servo1.ChangeDutyCycle(0)

servo1.stop()
GPIO.cleanup()