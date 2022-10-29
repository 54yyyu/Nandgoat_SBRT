# Import all required libraries
import RPi.GPIO as GPIO
from time import sleep

# Set the pin configuration mode an RPi
GPIO.setmode(GPIO.BCM)

# Input pins are used to determine direction and enable for speed
m1_input1 = 23
m1_input2 = 24
m2_input1 = 25
m2_input2 = 26
m3_input1 = 27
m3_input2 = 28
m4_input1 = 29
m4_input2 = 30

m_enable = 18

# Set up the pins as output pins
GPIO.setup(m1_input1, GPIO.OUT)
GPIO.setup(m1_input2, GPIO.OUT)
GPIO.setup(m2_input1, GPIO.OUT)
GPIO.setup(m2_input2, GPIO.OUT)
GPIO.setup(m3_input1, GPIO.OUT)
GPIO.setup(m3_input2, GPIO.OUT)
GPIO.setup(m4_input1, GPIO.OUT)
GPIO.setup(m4_input2, GPIO.OUT)

GPIO.setup(m_enable, GPIO.OUT)

# Set up pwm signal at 50Hz and start with 0 duty cycle
pwm = GPIO.PWM(m_enable, 50)
pwm.start(0)

# Function to control the speed and direction of the motor
def moveMotor(speed, input_1, input_2):
    # Conditional to check if inputted value is valid
    # otherwise all motors are turned off
    if speed > 100 or speed < -100:
        print("Invalid speed")
        pwm.ChangeDutyCycle(0)
        GPIO.output(input_1, GPIO.LOW)
        GPIO.output(input_2, GPIO.LOW)
        return

    # Sets the direction to backwards at inputted speed
    if speed < 0:
        GPIO.output(input_1, GPIO.LOW)
        GPIO.output(input_2, GPIO.HIGH)
        pwm.ChangeDutyCycle(-speed)

    # Sets the direction to forwards at inputted speed
    else:
        GPIO.output(input_1, GPIO.HIGH)
        GPIO.output(input_2, GPIO.LOW)
        pwm.ChangeDutyCycle(speed)

def moveForward(speed):
    moveMotor(speed, m1_input1, m1_input2)
    moveMotor(speed, m2_input1, m2_input2)
    moveMotor(speed, m3_input1, m3_input2)
    moveMotor(speed, m4_input1, m4_input2)

def moveBackward(speed):
    moveMotor(-speed, m1_input1, m1_input2)
    moveMotor(-speed, m2_input1, m2_input2)
    moveMotor(-speed, m3_input1, m3_input2)
    moveMotor(-speed, m4_input1, m4_input2)

def turnLeft(speed):
    moveMotor(-speed, m1_input1, m1_input2)
    moveMotor(-speed, m2_input1, m2_input2)
    moveMotor(speed, m3_input1, m3_input2)
    moveMotor(speed, m4_input1, m4_input2)

# Try, except, finally to ensure pin cleanup
"""try:
    while True:
        # Reads in a float from the console
        speed = float(input("Enter a speed: "))
        # Passes speed as paramter to moveMotor
        moveMotor(speed)
except KeyboardInterrupt:
    print("Finished")
finally:
    GPIO.cleanup()"""